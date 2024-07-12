package matcha.banking.be.dao;

import matcha.banking.be.entity.CartItemEntity;
import org.springframework.data.repository.CrudRepository;

public interface CartItemDao extends CrudRepository<CartItemEntity, Long> {
}
