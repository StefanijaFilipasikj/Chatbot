package mk.ukim.finki.backend.repository;

import mk.ukim.finki.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByUserUsername(String username);
    void deleteAllByUserUsername(String username);
}
