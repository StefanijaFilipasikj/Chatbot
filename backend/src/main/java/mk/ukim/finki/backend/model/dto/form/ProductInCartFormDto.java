package mk.ukim.finki.backend.model.dto.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductInCartFormDto {
    private String username;
    private Long productId;
    private Integer quantity;
}
