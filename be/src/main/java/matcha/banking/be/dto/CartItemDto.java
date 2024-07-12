package matcha.banking.be.dto;

import lombok.Data;

@Data
public class CartItemDto {
    private Long id;
    private Integer productId;
    private Integer quantity;
}
