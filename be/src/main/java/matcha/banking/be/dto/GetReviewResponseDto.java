package matcha.banking.be.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetReviewResponseDto {
    private Long id;
    private Integer userId;
    private String userName;
    private String content;
    private Double rating;
    private LocalDateTime updated;
}
