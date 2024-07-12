package mk.ukim.finki.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import mk.ukim.finki.backend.model.enumerations.Role;

@Entity
@Data
@NoArgsConstructor
@Table(name = "chatbot_users")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    @Id
    private String username;
    private String password;
    @OneToOne(mappedBy = "user")
    @JsonManagedReference
    @EqualsAndHashCode.Exclude
    private ShoppingCart cart;
    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
