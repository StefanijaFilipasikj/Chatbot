package mk.ukim.finki.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.User;
import mk.ukim.finki.backend.model.dto.OrderDto;
import mk.ukim.finki.backend.service.OrderService;
import mk.ukim.finki.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserRestController {

    private final UserService userService;

    @GetMapping("/{username}")
    UserDetails getAllOrdersFromUser (@PathVariable String username){
        return userService.loadUserByUsername(username);
    }
}
