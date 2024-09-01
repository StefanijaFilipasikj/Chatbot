package mk.ukim.finki.backend.service;

import mk.ukim.finki.backend.model.Message;

import java.util.List;

public interface MessageService {
    List<Message> findAllByUsername(String username);
    void addMessage(Message message);
    void deleteAllByUsername(String username);
}
