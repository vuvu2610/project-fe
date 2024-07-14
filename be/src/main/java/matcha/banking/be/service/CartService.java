package matcha.banking.be.service;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.dao.CartDao;
import matcha.banking.be.dao.ProductDao;
import matcha.banking.be.dao.UserDao;
import matcha.banking.be.dto.CartRequestDto;
import matcha.banking.be.dto.CartRequestPayDto;
import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.ProductEntity;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartDao cartDao;
    private final ProductDao productDao;
    private final UserDao userDao;

    public CartEntity addToCart(CartRequestDto cartRequestDto) {
        CartEntity cartEntity = cartDao.findByUserIdAndProductId(cartRequestDto.getUserId(), cartRequestDto.getProductId()).stream()
                .filter(cartEntity1 -> cartEntity1.getStatusCode() == 0).findFirst().orElse(new CartEntity());

        String errorMessage = inputCheck(cartRequestDto);

        if (!errorMessage.isEmpty()) {
            throw new IllegalArgumentException(errorMessage);
        }

        if (cartEntity.getId() != null) {
            cartEntity.setQuantity(cartEntity.getQuantity() + cartRequestDto.getQuantity());
            cartEntity.setUpdated(LocalDateTime.now());
        } else {
            cartEntity.setUserId(cartRequestDto.getUserId());
            cartEntity.setProductId(cartRequestDto.getProductId());
            cartEntity.setQuantity(cartRequestDto.getQuantity());
            cartEntity.setStatusCode(0);
            cartEntity.setCreated(LocalDateTime.now());
            cartEntity.setUpdated(LocalDateTime.now());
        }
        cartDao.save(cartEntity);
        return cartEntity;
    }

    public void deleteFromCart(List<Long> ids) {
        for (Long id : ids) {
            cartDao.findById(id).orElseThrow(() -> new EmptyResultDataAccessException("Cart not found", 1));
        }
        cartDao.deleteAllById(ids);

    }

    public void payCart(List<CartRequestPayDto> cartRequestPayDtos) {
        List<CartEntity> cartEntities = new ArrayList<>();
        List<ProductEntity> productEntities = new ArrayList<>();
        for (CartRequestPayDto cartRequestPayDto : cartRequestPayDtos) {
            CartEntity cartEntity = cartDao.findById(cartRequestPayDto.getId()).orElseThrow(() -> new EmptyResultDataAccessException("Cart not found", 1));

            ProductEntity productEntity = productDao.findById(cartEntity.getProductId()).orElseThrow(() -> new EmptyResultDataAccessException("Product not found", 1));
            if (productEntity.getRemainingQuantity() < cartRequestPayDto.getQuantity()) {
                throw new IllegalArgumentException("Product out of stock");
            }
            productEntity.setRemainingQuantity(productEntity.getRemainingQuantity() - cartRequestPayDto.getQuantity());
            productEntity.setQuantitySold(productEntity.getQuantitySold() + cartRequestPayDto.getQuantity());
            productEntity.setUpdatedAt(LocalDateTime.now());

            cartEntity.setStatusCode(1);
            cartEntity.setQuantity(cartRequestPayDto.getQuantity());
            cartEntity.setUpdated(LocalDateTime.now());

            cartEntities.add(cartEntity);
            productEntities.add(productEntity);
        }
        cartDao.saveAll(cartEntities);
        productDao.saveAll(productEntities);
    }

    public List<CartEntity> getAllCartByUserId(Integer userId) {
        if (!userDao.existsById(userId)) {
            throw new EmptyResultDataAccessException("User not found", 1);
        }
        return cartDao.findByUserId(userId).stream().filter(cartEntity -> cartEntity.getStatusCode() == 0).toList();
    }

    public List<CartEntity> getAllValidCartByUserId(Integer userId) {
        if (!userDao.existsById(userId)) {
            throw new EmptyResultDataAccessException("User not found", 1);
        }
        return cartDao.findByUserId(userId).stream().filter(cartEntity -> cartEntity.getStatusCode() == 1).toList();
    }

    public CartEntity getCartById(Long id) {
        return cartDao.findById(id).orElseThrow(() -> new EmptyResultDataAccessException("Cart not found", 1));
    }

    public String inputCheck(CartRequestDto cartRequestDto) {
        StringBuilder errorMessage = new StringBuilder();
        if (cartRequestDto.getUserId() == null) {
            errorMessage.append("User ID is required");
        } else if (cartRequestDto.getProductId() == null) {
            errorMessage.append("Product ID is required");
        } else if (cartRequestDto.getQuantity() == null) {
            errorMessage.append("Quantity is required");
        } else if (!userDao.existsById(cartRequestDto.getUserId())) {
            errorMessage.append("User not found");
        } else if (!productDao.existsById(cartRequestDto.getProductId())) {
            errorMessage.append("Product not found");
        }
        return errorMessage.toString();
    }

}
