package matcha.banking.be.dto;

import lombok.Data;

@Data
public class GetCartReponseDto {
    private Long cartId;
    private String productImage;
    private Double price;
    private String productName;
    private Integer productId;
    private Integer quantity;
}
