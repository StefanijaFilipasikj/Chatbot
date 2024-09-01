package mk.ukim.finki.backend.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.Message;
import mk.ukim.finki.backend.repository.MessageRepository;
import mk.ukim.finki.backend.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    @Override
    @Transactional
    public List<Message> findAllByUsername(String username) {
        return messageRepository.findAllByUserUsername(username);
    }

    @Override
    @Transactional
    public void addMessage(Message message) {
        messageRepository.save(message);
    }

    @Override
    @Transactional
    public void deleteAllByUsername(String username) {
        messageRepository.deleteAllByUserUsername(username);
    }
}
