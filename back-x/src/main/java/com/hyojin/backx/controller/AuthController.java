package com.hyojin.backx.controller;

import com.hyojin.backx.config.jwt.JwtProvider;
import com.hyojin.backx.domain.User;
import com.hyojin.backx.domain.Verification;
import com.hyojin.backx.exception.UserException;
import com.hyojin.backx.repository.UserRepository;
import com.hyojin.backx.response.AuthResponse;
import com.hyojin.backx.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String birthDate = user.getBirthDate();

        User isEmailExist = userRepository.findByEmail(email);

        if (isEmailExist != null) {
            throw new UserException("Email is already used with another account");
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFullName(fullName);
        createdUser.setBirthDate(birthDate);
        createdUser.setVerification(new Verification());

        User savedUser = userRepository.save(createdUser);

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(response, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody User user) {
        String username = user.getEmail();
        String password = user.getPassword();

        Authentication authentication = authenticate(username, password);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(response, HttpStatus.ACCEPTED);
    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
