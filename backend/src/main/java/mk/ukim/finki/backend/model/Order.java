package mk.ukim.finki.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime orderedAt;
    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
    private List<ProductInOrder> productsInOrder;
    @ManyToOne
    private User user;

    public Order(User user) {
        this.user = user;
        this.orderedAt = LocalDateTime.now();
    }
}
