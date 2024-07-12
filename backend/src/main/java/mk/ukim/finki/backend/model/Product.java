package mk.ukim.finki.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;
    private String title;
    private Integer warranty;
    private Double regularPrice;
    private Double happyPrice;
    private String imageUrl;
    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Description> descriptions;

    public Product(String url, String title, Integer warranty, Double regularPrice, Double happyPrice, String imageUrl) {
        this.url = url;
        this.title = title;
        this.warranty = warranty;
        this.regularPrice = regularPrice;
        this.happyPrice = happyPrice;
        this.imageUrl = imageUrl;
        this.descriptions = new ArrayList<>();
    }
}
