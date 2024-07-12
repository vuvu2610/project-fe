package matcha.banking.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.dto.CartDto;
import matcha.banking.be.dto.CartItemDto;
import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.mapper.CartItemMapper;
import matcha.banking.be.mapper.CartItemMapperImpl;
import matcha.banking.be.mapper.CartMapper;
import matcha.banking.be.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final CartMapper cartMapper;
    private final CartItemMapper cartItemMapper;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getCartByUserId(@PathVariable Integer userId) {
        try {
            return ResponseEntity.ok(cartMapper.toDto(cartService.getCart(userId)));
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<?> addCartItem(@PathVariable Long cartId, @RequestBody CartItemDto cartItemDto) {
        try {
            return ResponseEntity.ok(cartItemMapper.toDto(cartService.addCartItem(cartId, cartItemDto)));
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long cartItemId) {
        try {
            cartService.removeCartItem(cartItemId);
            return ResponseEntity.ok("Delete success");
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<?> updateCartItem(@PathVariable Long cartItemId, @RequestBody CartItemDto cartItemDto) {
        try {
            return ResponseEntity.ok(cartItemMapper.toDto(cartService.updateCartItem(cartItemId, cartItemDto.getQuantity())));
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
