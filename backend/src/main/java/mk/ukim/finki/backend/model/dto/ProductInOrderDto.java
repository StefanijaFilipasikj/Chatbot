package mk.ukim.finki.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductInOrderDto {
    private Long id;
    private ProductDto product;
    private Integer quantity;
}
