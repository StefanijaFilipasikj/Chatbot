package mk.ukim.finki.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;

@Entity
@Data
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role;
    @Lob
    private String content;
    @ManyToOne
    private User user;

    public Message(String content, String role, User user){
        this.content = content;
        this.role = role;
        this.user = user;
    }
}
