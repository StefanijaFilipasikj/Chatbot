package mk.ukim.finki.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.Message;
import mk.ukim.finki.backend.model.User;
import mk.ukim.finki.backend.model.dto.MessageDto;
import mk.ukim.finki.backend.service.MessageService;
import mk.ukim.finki.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/messages")
@AllArgsConstructor
public class MessageRestController {
    private final MessageService messageService;
    private final UserService userService;

    @GetMapping
    public List<Message> findAll(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return messageService.findAllByUsername(username);
    }

    @PostMapping("/add")
    public void save(@RequestBody MessageDto messageDto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = (User) userService.loadUserByUsername(username);
        Message message = new Message(messageDto.getContent(), messageDto.getRole(), user);
        messageService.addMessage(message);
    }

    @DeleteMapping("/delete")
    public void deleteAllByUsername(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        messageService.deleteAllByUsername(username);
    }

}
