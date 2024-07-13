package matcha.banking.be.dao;

import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CartDao extends CrudRepository<CartEntity, Long> {
    List<CartEntity> findByUserIdAndProductId(Integer userId, Integer productId);
    List<CartEntity> findByUserId(Integer userId);
}
