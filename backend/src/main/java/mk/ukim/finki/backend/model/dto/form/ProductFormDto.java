package mk.ukim.finki.backend.model.dto.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.backend.model.dto.DescriptionDto;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductFormDto {
    private String url;
    private String title;
    private Integer warranty;
    private Double regularPrice;
    private Double happyPrice;
    private String imageUrl;
    private List<DescriptionDto> descriptions;
}
