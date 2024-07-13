package matcha.banking.be.dao;

import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.ReviewEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewDao extends CrudRepository<ReviewEntity, Long> {
    List<ReviewEntity> findAll();
    Optional<ReviewEntity> findById(Long id);
    List<ReviewEntity> findByUserId(Integer userId);
    List<ReviewEntity> findByProductId(Integer productId);
    List<ReviewEntity> findByRating(Double rating);
    List<ReviewEntity> findByContent(String content);
    List<ReviewEntity> findByUserIdAndProductId(Integer userId, Integer productId);
    List<ReviewEntity> findByUserIdAndRating(Integer userId, Double rating);
    List<ReviewEntity> findByUserIdAndContent(Integer userId, String content);
    List<ReviewEntity> findByProductIdAndRating(Integer productId, Double rating);
    List<ReviewEntity> findByProductIdAndContent(Integer productId, String content);
    List<ReviewEntity> findByRatingAndContent(Double rating, String content);
    List<ReviewEntity> findByUserIdAndProductIdAndRating(Integer userId, Integer productId, Double rating);
    List<ReviewEntity> findByUserIdAndProductIdAndContent(Integer userId, Integer productId, String content);
    List<ReviewEntity> findByUserIdAndRatingAndContent(Integer userId, Double rating, String content);
    List<ReviewEntity> findByProductIdAndRatingAndContent(Integer productId, Double rating, String content);
    List<ReviewEntity> findByUserIdAndProductIdAndRatingAndContent(Integer userId, Integer productId, Double rating, String content);
}
