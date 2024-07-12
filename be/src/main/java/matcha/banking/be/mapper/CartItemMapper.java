package matcha.banking.be.mapper;

import matcha.banking.be.dto.CartItemDto;
import matcha.banking.be.entity.CartItemEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartItemMapper {
    CartItemDto toDto(CartItemEntity cartItemEntity);
    CartItemEntity toEntity(CartItemDto cartItemDto);
}
