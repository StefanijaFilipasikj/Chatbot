package mk.ukim.finki.backend.model.dto.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.backend.model.enumerations.Role;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFormDto {
    private String username;
    private String password;
    private String repeatPassword;
    private Role role;
}
