package mk.ukim.finki.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DescriptionDto {
    private Long id;
    private String key;
    private String value;
}
