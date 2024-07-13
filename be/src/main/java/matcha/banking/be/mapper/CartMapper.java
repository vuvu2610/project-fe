package matcha.banking.be.mapper;

import matcha.banking.be.dto.GetCartReponseDto;
import matcha.banking.be.dto.GetUserInfoDto;
import matcha.banking.be.entity.CartEntity;
import matcha.banking.be.entity.ProductEntity;
import matcha.banking.be.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartMapper {

    default GetCartReponseDto dtoToEntity(ProductEntity productEntity, Integer quantity) {
        GetCartReponseDto getCartReponseDto = new GetCartReponseDto();
        getCartReponseDto.setPrice(productEntity.getPrice());
        getCartReponseDto.setProductImage(productEntity.getImage());
        getCartReponseDto.setProductName(productEntity.getName());
        getCartReponseDto.setQuantity(quantity);
        return getCartReponseDto;
    }
}
