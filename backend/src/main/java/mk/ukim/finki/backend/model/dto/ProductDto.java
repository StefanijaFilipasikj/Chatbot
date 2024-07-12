package mk.ukim.finki.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.backend.model.Description;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String url;
    private String title;
    private Integer warranty;
    private Double regularPrice;
    private Double happyPrice;
    private String imageUrl;
    private List<DescriptionDto> descriptions;
}
