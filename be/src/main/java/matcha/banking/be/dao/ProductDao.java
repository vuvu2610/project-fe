package matcha.banking.be.dao;

import matcha.banking.be.entity.ProductEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProductDao extends CrudRepository<ProductEntity, Integer> {
    List<ProductEntity> findAll();
    Optional<ProductEntity> findById(Integer id);

    @Query("SELECT p FROM ProductEntity p ORDER BY p.createdAt DESC")
    List<ProductEntity> findByOrderByCreatedAtDesc(Pageable pageable);

    @Query("SELECT p FROM ProductEntity p ORDER BY p.quantitySold DESC")
    List<ProductEntity> findByQuantitySoldOrderByDesc(Pageable pageable);

    @Query("SELECT p FROM ProductEntity p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<ProductEntity> findByName(String name);
}
