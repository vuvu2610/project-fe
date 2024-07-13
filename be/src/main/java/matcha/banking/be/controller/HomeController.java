package matcha.banking.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.service.ProductService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
    private final ProductService productService;

    @GetMapping("/new-product")
    public ResponseEntity<Object> getNewProduct(@RequestParam Integer pageSize) {
        try {
            return ResponseEntity.ok(productService.getTop5Products(pageSize));
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/best-seller")
    public ResponseEntity<Object> getBestSeller(@RequestParam Integer pageSize) {
        try {
            return ResponseEntity.ok(productService.getTop5ProductsByQuantitySold(pageSize));
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

}
