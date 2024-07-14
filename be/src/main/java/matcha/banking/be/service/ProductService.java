package matcha.banking.be.service;

import lombok.RequiredArgsConstructor;
import matcha.banking.be.dao.ProductDao;
import matcha.banking.be.entity.ProductEntity;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductDao productDao;

    public List<ProductEntity> getAllProducts() {
        return productDao.findAll();
    }

    public ProductEntity getProductById(Integer id) {
        return productDao.findById(id).orElseThrow(() -> new EmptyResultDataAccessException("Product not found", 1));
    }

    public List<ProductEntity> getTop5Products(Integer pageSize) {
        return productDao.findByOrderByCreatedAtDesc(PageRequest.of(0, pageSize));
    }

    public List<ProductEntity> getTop5ProductsByQuantitySold(Integer pageSize) {
        return productDao.findByQuantitySoldOrderByDesc(PageRequest.of(0, pageSize));
    }

    public List<ProductEntity> searchByName(String name) {
        if (Objects.isNull(name) || name.isEmpty()){
            return productDao.findAll();
        }
        return productDao.findByName(name);
    }
}
