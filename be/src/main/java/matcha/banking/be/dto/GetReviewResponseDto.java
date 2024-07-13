package matcha.banking.be.dto;

import lombok.Data;

@Data
public class GetReviewResponseDto {
    private String userName;
    private String content;
    private Double rating;
}
