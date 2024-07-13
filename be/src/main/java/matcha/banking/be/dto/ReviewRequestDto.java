package matcha.banking.be.dto;

import lombok.Data;

@Data
public class ReviewRequestDto {
    private Integer userId;
    private Integer productId;
    private String content;
    private Double rating;
}
