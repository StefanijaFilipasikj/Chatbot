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
    List<Product> findByCategoryOrderByTitle(String category);
    List<Product> findByRegularPriceBetweenOrderByTitle(Double min, Double max);
    List<Product> findByCategoryAndRegularPriceBetweenOrderByTitle(String category, Double min, Double max);
    @Query("SELECT MAX(p.regularPrice) FROM Product p")
    double findMaxPrice();
}
