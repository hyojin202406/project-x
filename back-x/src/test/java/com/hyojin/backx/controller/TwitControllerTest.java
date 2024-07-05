package com.hyojin.backx.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyojin.backx.config.jwt.JwtProvider;
import com.hyojin.backx.domain.Twit;
import com.hyojin.backx.domain.User;
import com.hyojin.backx.domain.Verification;
import com.hyojin.backx.dto.TwitDto;
import com.hyojin.backx.mapper.TwitDtoMapper;
import com.hyojin.backx.repository.UserRepository;
import com.hyojin.backx.service.CustomUserDetailsService;
import com.hyojin.backx.service.TwitService;
import com.hyojin.backx.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TwitControllerTest {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private TwitService twitService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @BeforeEach
    public void mockMvcSetUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
//        blogRepository.deleteAll();
    }

    @DisplayName("트윗 생성 테스트")
    @Test
    public void createTwitTest() throws Exception {

        // given
        final String url = "/api/twits/create";
        String email = "test@gmail.com";
        String password = "test";
        String content = "test twit!";

        try {
            User user = userRepository.findByEmail(email);
            Twit req = new Twit();

            req.setContent(content);
            MultipartFile image = null;
            if (image != null && !image.isEmpty()) {
                String imageUrl = saveImage(image); // 이미지 저장 로직 구현
                req.setImage(imageUrl);
            }

            Twit twit = twitService.createTwit(req, user);
            System.out.println("twit = " + twit);

            // JWT 토큰 생성
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtProvider.generateToken(authentication);

            // 요청 바디 생성
            ObjectMapper objectMapper = new ObjectMapper();

            // MultipartFile을 MockMultipartFile로 생성 (테스트용)
            MultipartFile mockImage = new MockMultipartFile(
                    "image",
                    "testImage.jpg",
                    MediaType.IMAGE_JPEG_VALUE,
                    "Test Image Content".getBytes()
            );

            // 요청 바디를 담을 Map 생성
            Map<String, Object> requestBodyMap = new HashMap<>();
            requestBodyMap.put("content", content);
            requestBodyMap.put("image", null);

            // 요청 바디 JSON 문자열 생성
            final String requestBody = objectMapper.writeValueAsString(requestBodyMap);

            // when
            ResultActions result = mockMvc.perform(multipart(url)
//                            .file((MockMultipartFile) image)
                            .content(requestBody)
                            .header("Authorization", "Bearer " + token)
                            .contentType(MediaType.MULTIPART_FORM_DATA));

            // then
            result.andExpect(status().isCreated());

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public String saveImage(MultipartFile image) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.copy(image.getInputStream(), filePath);
        return filePath.toString(); // 파일 경로를 반환하거나, 이미지에 접근할 수 있는 URL을 반환할 수 있습니다.
    }

}