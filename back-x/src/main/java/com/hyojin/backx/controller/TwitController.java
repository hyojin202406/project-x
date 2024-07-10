package com.hyojin.backx.controller;

import com.hyojin.backx.domain.Twit;
import com.hyojin.backx.domain.User;
import com.hyojin.backx.dto.TwitDto;
import com.hyojin.backx.exception.TwitException;
import com.hyojin.backx.exception.UserException;
import com.hyojin.backx.mapper.TwitDtoMapper;
import com.hyojin.backx.request.TwitReplyRequest;
import com.hyojin.backx.response.ApiResponse;
import com.hyojin.backx.service.TwitService;
import com.hyojin.backx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/twits")
public class TwitController {

    @Autowired
    private TwitService twitService;
    @Autowired
    private UserService userService;

    @Value("${file.upload-dir}")
    private String uploadDir;

//    @PostMapping("/create")
//    public ResponseEntity<TwitDto> createTwit(@RequestBody Twit req, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
//        User user = userService.findUserProfileByJwt(jwt);
//        Twit twit = twitService.createTwit(req, user);
//        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
//        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
//    }

    @PostMapping("/create")
    public ResponseEntity<TwitDto> createTwit(
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, TwitException, IOException {
        User user = userService.findUserProfileByJwt(jwt);

        Twit req = new Twit();
        req.setContent(content);

        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image); // 이미지 저장 로직 구현
            req.setImage(imageUrl);
        }

        Twit twit = twitService.createTwit(req, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    public String saveImage(MultipartFile image) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.copy(image.getInputStream(), filePath);
        return fileName; // 파일 경로를 반환하거나, 이미지에 접근할 수 있는 URL을 반환할 수 있습니다.
    }

    @PostMapping("/reply")
    public ResponseEntity<TwitDto> createReply(@RequestBody TwitReplyRequest req, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        Twit twit = twitService.createdReply(req, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    @PutMapping("/{twitId}/retwit")
    public ResponseEntity<TwitDto> retwit(@PathVariable("twitId") Long twitId, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        Twit twit = twitService.retwit(twitId, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @GetMapping("/{twitId}")
    public ResponseEntity<TwitDto> findTwitById(@PathVariable("twitId") Long twitId, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        Twit twit = twitService.findById(twitId);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @DeleteMapping("/{twitId}")
    public ResponseEntity<ApiResponse> deleteTwit(@PathVariable("twitId") Long twitId, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        twitService.deleteTwitById(twitId, user.getId());
        ApiResponse res = new ApiResponse("Twit deleted Successfully", true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<TwitDto>> getAllTwit(@RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        List<TwitDto> twitDtos = null;
        try {
            User user = userService.findUserProfileByJwt(jwt);
            List<Twit> twits = twitService.findAllTwit();
            twitDtos = TwitDtoMapper.toTwitDtos(twits, user);
        } catch (Exception e) {
            e.getStackTrace();
        }

        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }

    @GetMapping("/image")
    public ResponseEntity<?> returnImage(@RequestParam("image") String image) {
        String path = "C:\\study\\image\\"; //이미지가 저장된 위치
        Resource resource = new FileSystemResource(path + image);
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TwitDto>> getUsersAllTwits(@PathVariable("userId") Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Twit> twits = twitService.getUserTwit(user);
        List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, user);

        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TwitDto>> findTwitByLikesContainesUser(@PathVariable("userId") Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Twit> twits = twitService.findByLikesContainsUser(user);
        List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, user);

        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }
}
