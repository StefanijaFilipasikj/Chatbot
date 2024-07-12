package mk.ukim.finki.backend.repository;

import mk.ukim.finki.backend.model.Product;
import mk.ukim.finki.backend.model.ProductInOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductInOrderRepository extends JpaRepository<ProductInOrder, Long> {
    void deleteAllByProduct(Product product);
}
