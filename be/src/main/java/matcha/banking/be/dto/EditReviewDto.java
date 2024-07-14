package matcha.banking.be.dto;

import lombok.Data;

@Data
public class EditReviewDto {
    private Long id;
    private String content;
    private Double rating;
}
