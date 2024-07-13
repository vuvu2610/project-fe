package matcha.banking.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.dto.CartRequestDto;
import matcha.banking.be.dto.CartRequestPayDto;
import matcha.banking.be.dto.GetCartReponseDto;
import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.ProductEntity;
import matcha.banking.be.mapper.CartMapper;
import matcha.banking.be.service.CartService;
import matcha.banking.be.service.ProductService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    private final ProductService productService;
    private final CartMapper cartMapper;

    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getCartByUserId(@PathVariable Integer userId) {
        try {
            List<CartEntity> cartEntities = cartService.getAllCartByUserId(userId);
            List<GetCartReponseDto> getCartReponseDtos = cartEntities.stream().map(cartEntity -> {
                ProductEntity productEntity = productService.getProductById(cartEntity.getProductId());
                GetCartReponseDto getCartReponseDto = cartMapper.dtoToEntity(productEntity, cartEntity.getQuantity());
                getCartReponseDto.setCartId(cartEntity.getId());
                getCartReponseDto.setProductId(productEntity.getId());
                getCartReponseDto.setRemainingQuantity(productEntity.getRemainingQuantity());
                return getCartReponseDto;
            }).toList();
            return ResponseEntity.ok(getCartReponseDtos);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping()
    public ResponseEntity<Object> addToCart(@RequestBody CartRequestDto cartRequestDto) {
        try {
            return ResponseEntity.ok(cartService.addToCart(cartRequestDto));
        } catch (DuplicateKeyException exception) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @DeleteMapping()
    public ResponseEntity<Object> deleteFromCart(@RequestBody List<Long> ids) {
        try {
            cartService.deleteFromCart(ids);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @PostMapping("/pay")
    public ResponseEntity<Object> payCart(@RequestBody List<CartRequestPayDto> cartRequestPayDtos) {
        try {
            cartService.payCart(cartRequestPayDtos);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", exception.getMessage()));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(Map.of("error", exception.getMessage()));
        }
    }


}
