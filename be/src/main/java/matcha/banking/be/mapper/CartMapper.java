package matcha.banking.be.mapper;

import matcha.banking.be.dto.CartDto;
import matcha.banking.be.dto.GetUserInfoDto;
import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartDto toDto(CartEntity cartEntity);
    CartEntity toEntity(CartDto cartDto);
}
