package mk.ukim.finki.backend.repository;

import mk.ukim.finki.backend.model.Description;
import mk.ukim.finki.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescriptionRepository extends JpaRepository<Description, Long> {
    void deleteAllByProduct(Product product);
}
