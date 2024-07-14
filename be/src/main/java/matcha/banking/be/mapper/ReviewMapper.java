package matcha.banking.be.mapper;

import matcha.banking.be.dto.GetCartReponseDto;
import matcha.banking.be.dto.GetReviewResponseDto;
import matcha.banking.be.entity.ProductEntity;
import matcha.banking.be.entity.ReviewEntity;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    GetReviewResponseDto toResponseDto(ReviewEntity productEntity);

    default List<GetReviewResponseDto> toResponseDtoList(List<ReviewEntity> reviewEntities) {
        return reviewEntities.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }


}
