package matcha.banking.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.service.CartService;
import matcha.banking.be.service.ProductService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping()
    public ResponseEntity<Object> searchProduct(@RequestParam(required = false) String name) {
        try {
            return ResponseEntity.ok(productService.searchByName(name));
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCartByUserId(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (EmptyResultDataAccessException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }
}
