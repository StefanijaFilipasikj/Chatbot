package mk.ukim.finki.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartDto {
    private Long id;
    private List<ProductInCartDto> productsInCart;
    private String username;
}
