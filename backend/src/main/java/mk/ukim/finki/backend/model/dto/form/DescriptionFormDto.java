package mk.ukim.finki.backend.model.dto.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DescriptionFormDto {
    private String key;
    private String value;
}
