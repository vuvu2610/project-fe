package matcha.banking.be.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import matcha.banking.be.dto.*;
import matcha.banking.be.entity.UserEntity;
import matcha.banking.be.mapper.UserMapper;
import matcha.banking.be.service.AuthService;
import matcha.banking.be.service.EmailService;
import matcha.banking.be.service.ForgotPasswordService;
import matcha.banking.be.service.UserService;
import matcha.banking.be.util.JwtUtil;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final UserMapper userMapper;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;
    private final ForgotPasswordService forgotPasswordService;

    @PostMapping("/register")
    public ResponseEntity<Object> createUser(@RequestBody RegisterDto registerDto) {
        Map<String, Object> responseBody = new HashMap<>();
        try {
            UserEntity userEntity = userService.createUser(registerDto);
            GetUserInfoDto getUserInfoDto = userMapper.entityToDto(userEntity);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{email}")
                    .buildAndExpand(registerDto.getEmail())
                    .toUri();

            return ResponseEntity.created(location).body(getUserInfoDto);
        } catch (IllegalArgumentException ie) {
            responseBody.put("error", ie.getMessage());
            return ResponseEntity.badRequest().body(responseBody);
        } catch (DuplicateKeyException de) {
            responseBody.put("error", de.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        Map<String, Object> responseBody = new HashMap<>();
        try {
            LoginReponseBodyDto loginReponseBodyDto = authService.login(loginDto.getEmail(), loginDto.getPassword());

            Cookie cookie = new Cookie("token", loginReponseBodyDto.getToken());
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setMaxAge(24 * 60 * 60); // 1 day
            cookie.setPath("/");
            cookie.setAttribute("SameSite", "Strict");
            response.addCookie(cookie);
            return ResponseEntity.ok(loginReponseBodyDto.getUser());
        } catch (IllegalArgumentException ie) {
            responseBody.put("error", ie.getMessage());
            return ResponseEntity.badRequest().body(responseBody);
        } catch (EmptyResultDataAccessException ee) {
            responseBody.put("error", ee.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<Object> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String token) {
        Map<String, Object> responseBody = new HashMap<>();
        try {
            UserEntity userEntity = userService.getUserByEmail(userService.getEmailfromToken(token.substring(7)));
            GetUserInfoDto getUserInfoDto = userMapper.entityToDto(userEntity);
            return ResponseEntity.ok(getUserInfoDto);
        } catch (IllegalArgumentException ie) {
            responseBody.put("error", ie.getMessage());
            return ResponseEntity.badRequest().body(responseBody);
        } catch (EmptyResultDataAccessException ee) {
            responseBody.put("error", ee.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        } catch (NullPointerException ne) {
            responseBody.put("error", "Token is required");
            return ResponseEntity.badRequest().body(responseBody);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/forgot-pass/{email}")
    public ResponseEntity<Object> sendPassToMail(@PathVariable String email) {
        UserEntity userEntity = userService.getUserByEmail(email);
        Map<String, String> responseBody = new HashMap<>();
        if (userEntity == null) {
            responseBody.put("error", "User not found");
            return ResponseEntity.notFound().build();
        }
        forgotPasswordService.processForgotPassword(email);
        responseBody.put("status", "Successfully!!!");
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/reset-password")
    public String resetPassword(@RequestParam("token") String token, @RequestParam("password") String password) {
        String email = jwtUtil.getEmailFromJwt(token);
        boolean isTokenValid = jwtUtil.validateTokenByEmail(token, email);
        if (isTokenValid) {
            userService.updatePassword(email, password);
            return "Password has been successfully reset.";
        } else {
            return "Invalid or expired reset token.";
        }
    }

}
