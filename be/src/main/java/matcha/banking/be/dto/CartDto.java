package matcha.banking.be.dto;

import lombok.Builder;
import lombok.Data;
import matcha.banking.be.entity.CartItemEntity;

import java.util.List;

@Data
@Builder
public class CartDto {
    private Long id;
    private List<CartItemDto> listCartItem;
}
