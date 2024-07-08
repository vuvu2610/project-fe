package matcha.banking.be.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/test")
public class TestingController {
    @GetMapping("/cookie")
    public String testingCookies() {
        return "cookie";
    }
}
