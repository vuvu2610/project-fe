package matcha.banking.be.dao;

import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.ReviewEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface ReviewDao extends CrudRepository<ReviewEntity, Long> {
    List<ReviewEntity> findAll();
    Optional<ReviewEntity> findById(Long id);
    List<ReviewEntity> findByProductId(Integer productId);
    List<ReviewEntity> findByUserIdAndProductId(Integer userId, Integer productId);

    @Query("SELECT r FROM ReviewEntity r ORDER BY r.rating DESC")
    List<ReviewEntity> getTopReview();
}
