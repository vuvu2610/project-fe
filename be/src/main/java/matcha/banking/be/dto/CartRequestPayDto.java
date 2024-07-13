package matcha.banking.be.dto;

import lombok.Data;

@Data
public class CartRequestPayDto {
    private Long id;
    private Integer productId;
    private Integer quantity;
    private Double price;
}
