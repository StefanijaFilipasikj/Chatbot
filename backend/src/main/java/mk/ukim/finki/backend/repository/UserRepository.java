package mk.ukim.finki.backend.repository;

import mk.ukim.finki.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
