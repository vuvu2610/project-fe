package matcha.banking.be.service;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.dao.CartDao;
import matcha.banking.be.dao.ProductDao;
import matcha.banking.be.dao.ReviewDao;
import matcha.banking.be.dao.UserDao;
import matcha.banking.be.dto.CartRequestDto;
import matcha.banking.be.dto.EditReviewDto;
import matcha.banking.be.dto.ReviewRequestDto;
import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.ReviewEntity;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewDao reviewDao;
    private final CartService cartService;

    public List<ReviewEntity> getAllReviews() {
        return reviewDao.findAll();
    }

    public List<ReviewEntity> getTopReview(Integer limit) {
        if (limit < 0) throw new IllegalArgumentException("Limit must be greater than 0");
        List<ReviewEntity> topReview = reviewDao.getTopReview();
        return reviewDao.getTopReview().subList(0, Math.min(topReview.size(), limit));
    }

    public List<ReviewEntity> getReviewsByProductId(Integer productId) {
        return reviewDao.findByProductId(productId);
    }


    public ReviewEntity registerReview(ReviewRequestDto reviewRequestDto) {

        CartEntity cartEntity = cartService.getAllValidCartByUserId(reviewRequestDto.getUserId()).stream()
                .filter(cart -> cart.getProductId().equals(reviewRequestDto.getProductId())).findFirst().orElseThrow(() -> new EmptyResultDataAccessException("You must buy it before review", 1));

        if (cartEntity.getStatusCode() == 0) {
            throw new IllegalArgumentException("Product not purchased");
        }
        if (!reviewDao.findByUserIdAndProductId(reviewRequestDto.getUserId(), reviewRequestDto.getProductId()).isEmpty()) {
            throw new DuplicateKeyException("Review already exists");
        }
        ReviewEntity reviewEntity = new ReviewEntity();
        reviewEntity.setUserId(reviewRequestDto.getUserId());
        reviewEntity.setProductId(reviewRequestDto.getProductId());
        reviewEntity.setRating(reviewRequestDto.getRating());
        reviewEntity.setContent(reviewRequestDto.getContent());
        reviewEntity.setCreated(LocalDateTime.now());
        reviewEntity.setUpdated(LocalDateTime.now());
        return reviewDao.save(reviewEntity);
    }

    public ReviewEntity editReview(EditReviewDto editReviewDto) {
        ReviewEntity reviewEntity = reviewDao.findById(editReviewDto.getId()).orElseThrow(() -> new EmptyResultDataAccessException("Review not found", 1));
        reviewEntity.setContent(editReviewDto.getContent());
        reviewEntity.setRating(editReviewDto.getRating());
        return reviewDao.save(reviewEntity);
    }
}
