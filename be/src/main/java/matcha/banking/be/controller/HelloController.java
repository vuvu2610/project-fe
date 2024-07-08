package matcha.banking.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.dto.GetUserInfoDto;
import matcha.banking.be.dto.LoginDto;
import matcha.banking.be.dto.LoginReponseBodyDto;
import matcha.banking.be.dto.RegisterDto;
import matcha.banking.be.entity.EmailDetails;
import matcha.banking.be.entity.UserEntity;
import matcha.banking.be.mapper.UserMapper;
import matcha.banking.be.service.AuthService;
import matcha.banking.be.service.UserService;
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
public class HelloController {
    @GetMapping("/hello")
    public ResponseEntity<Object> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String token){
        return ResponseEntity.ok("Hello from Server");
    }
}
