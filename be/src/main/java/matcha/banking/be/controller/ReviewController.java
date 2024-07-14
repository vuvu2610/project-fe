package matcha.banking.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.dto.*;
import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.ProductEntity;
import matcha.banking.be.entity.ReviewEntity;
import matcha.banking.be.entity.UserEntity;
import matcha.banking.be.mapper.CartMapper;
import matcha.banking.be.mapper.ReviewMapper;
import matcha.banking.be.service.CartService;
import matcha.banking.be.service.ProductService;
import matcha.banking.be.service.ReviewService;
import matcha.banking.be.service.UserService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Object> registerReview(@RequestBody ReviewRequestDto reviewRequestDto) {
        try {
            ReviewEntity reviewEntity = reviewService.registerReview(reviewRequestDto);
            GetReviewResponseDto getReviewResponseDto = reviewMapper.toResponseDto(reviewEntity);
            UserEntity userEntity = userService.getUserById(reviewRequestDto.getUserId());
            getReviewResponseDto.setUserName(userEntity.getName());
            return ResponseEntity.ok(getReviewResponseDto);
        } catch (DuplicateKeyException exception) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", exception.getMessage()));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(Map.of("error", exception.getMessage()));
        } catch (EmptyResultDataAccessException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", exception.getMessage()));
        }
    }

    @PutMapping()
    public ResponseEntity<Object> editReview(@RequestBody EditReviewDto editReviewDto) {
        try {
            ReviewEntity reviewEntity = reviewService.editReview(editReviewDto);

            return ResponseEntity.ok(editReviewDto);
        } catch (DuplicateKeyException exception) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", exception.getMessage()));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(Map.of("error", exception.getMessage()));
        } catch (EmptyResultDataAccessException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", exception.getMessage()));
        }
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Object> getReviewsByProductId(@PathVariable Integer productId) {
        try {
            List<ReviewEntity> listReview = reviewService.getReviewsByProductId(productId);
            List<GetReviewResponseDto> listReviewDto = reviewMapper.toResponseDtoList(listReview).stream()
                    .peek(reviewDto -> reviewDto.setUserName(userService.getUserById(reviewDto.getUserId()).getName()))
                    .toList();
            return ResponseEntity.ok(listReviewDto);
        } catch (DuplicateKeyException exception) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", exception.getMessage()));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(Map.of("error", exception.getMessage()));
        } catch (EmptyResultDataAccessException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", exception.getMessage()));
        }
    }
}
