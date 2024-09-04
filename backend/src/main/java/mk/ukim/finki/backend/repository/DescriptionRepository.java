package mk.ukim.finki.backend.repository;

import mk.ukim.finki.backend.model.Description;
import mk.ukim.finki.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface DescriptionRepository extends JpaRepository<Description, Long> {
    @Modifying
    @Query("delete from Description d where d.product.id =  ?1")
    void deleteAllByProductId(Long id);
}
