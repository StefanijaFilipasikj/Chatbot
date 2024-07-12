package mk.ukim.finki.backend.repository;

import mk.ukim.finki.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
