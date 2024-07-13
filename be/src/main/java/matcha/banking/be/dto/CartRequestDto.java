package matcha.banking.be.dto;

import lombok.Data;

@Data
public class CartRequestDto {
    private Integer userId;
    private Integer productId;
    private Integer quantity;
}
