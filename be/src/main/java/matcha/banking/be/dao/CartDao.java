package matcha.banking.be.dao;

import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CartDao extends CrudRepository<CartEntity, Long> {
    Optional<CartEntity> findByCustomer(UserEntity customer);
}
