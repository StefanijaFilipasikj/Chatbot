package mk.ukim.finki.backend.service;

import mk.ukim.finki.backend.model.Product;
import mk.ukim.finki.backend.model.dto.ProductDto;
import mk.ukim.finki.backend.model.dto.form.ProductFormDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();

    Page<Product> findAllWithPagination(Pageable pageable);
    Optional<Product> findById(Long id);
    Optional<ProductDto> create(ProductFormDto dto);
    Optional<ProductDto> edit(Long id, ProductFormDto dto);
    Optional<ProductDto> delete(Long id);
    List<String> findAllCategories();
    List<Product> findByCategory(String category);
    double getMaxProductPrice();
    List<Product> findByRegularPriceBetween(double minPrice, double maxPrice);
    List<Product> findByCategoryAndRegularPriceBetween(String category, double minPrice, double maxPrice);
}
