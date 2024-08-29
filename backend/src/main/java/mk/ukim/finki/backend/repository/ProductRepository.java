package mk.ukim.finki.backend.repository;

import mk.ukim.finki.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findAll(Pageable pageable);
    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findAllCategories();
    List<Product> findByCategory(String category);
    List<Product> findByRegularPriceBetween(Double min, Double max);
    List<Product> findByCategoryAndRegularPriceBetween(String category, Double min, Double max);
    @Query("SELECT MAX(p.regularPrice) FROM Product p")
    double findMaxPrice();
}
