package matcha.banking.be.service;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.dao.CartDao;
import matcha.banking.be.dao.CartItemDao;
import matcha.banking.be.dao.UserDao;
import matcha.banking.be.dto.CartItemDto;
import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.CartItemEntity;
import matcha.banking.be.entity.UserEntity;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartDao cartDao;
    private final UserDao userDao;
    private final CartItemDao cartItemDao;

    public CartEntity getCart(int customerId) {
        UserEntity user = userDao.findById(customerId).orElseThrow(() -> new EmptyResultDataAccessException("User not found", 1));
        return cartDao.findByCustomer(user).orElseThrow(() -> new EmptyResultDataAccessException("Cart not found", 1));
    }

    public CartItemEntity addCartItem(Long cartId, CartItemDto cartItem) {
        CartEntity cart = cartDao.findById(cartId).orElseThrow(() -> new EmptyResultDataAccessException("Cart not found", 1));
        CartItemEntity cartItemEntity = CartItemEntity.builder()
                .cart(cart)
                .productId(cartItem.getProductId())
                .quantity(cartItem.getQuantity())
                .build();
        return cartItemDao.save(cartItemEntity);
    }

    public void removeCartItem(Long cartItemId) {
        cartItemDao.findById(cartItemId).orElseThrow(() -> new EmptyResultDataAccessException("Cart item not found", 1));
        cartItemDao.deleteById(cartItemId);
    }

    public CartItemEntity updateCartItem(Long cartItemId, Integer quantity) {
        CartItemEntity cartItem = cartItemDao.findById(cartItemId).orElseThrow(() -> new EmptyResultDataAccessException("Cart item not found", 1));
        cartItem.setQuantity(quantity);
        return cartItemDao.save(cartItem);
    }

}
