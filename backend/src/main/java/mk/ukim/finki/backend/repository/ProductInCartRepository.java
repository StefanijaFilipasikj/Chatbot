package mk.ukim.finki.backend.repository;

import mk.ukim.finki.backend.model.Product;
import mk.ukim.finki.backend.model.ProductInCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductInCartRepository extends JpaRepository<ProductInCart, Long> {
    void deleteAllByProduct(Product product);
}
