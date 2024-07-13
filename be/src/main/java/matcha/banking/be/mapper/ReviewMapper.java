package matcha.banking.be.mapper;

import matcha.banking.be.dto.GetCartReponseDto;
import matcha.banking.be.dto.GetReviewResponseDto;
import matcha.banking.be.entity.ProductEntity;
import matcha.banking.be.entity.ReviewEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    GetReviewResponseDto toResponseDto(ReviewEntity productEntity);
}
