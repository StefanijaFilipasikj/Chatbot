package mk.ukim.finki.backend.repository;

import mk.ukim.finki.backend.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

}
