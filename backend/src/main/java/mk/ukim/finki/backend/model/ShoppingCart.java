package mk.ukim.finki.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    @EqualsAndHashCode.Exclude
    private User user;
    @OneToMany(mappedBy = "cart")
    private List<ProductInCart> productsInCart;

    public ShoppingCart(User user) {
        this.user = user;
        this.productsInCart = new ArrayList<>();
    }
}
