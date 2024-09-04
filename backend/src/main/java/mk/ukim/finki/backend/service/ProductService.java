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
    Page<Product> findByCategory(String category, Pageable pageable);
    double getMaxProductPrice();
    Page<Product> searchProducts(String query, Pageable pageable);
    Page<Product> findByRegularPriceBetween(double minPrice, double maxPrice, Pageable pageable);
    Page<Product> findByCategoryAndRegularPriceBetween(String category, double minPrice, double maxPrice, Pageable pageable);
}
