package mk.ukim.finki.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.dto.form.UserFormDto;
import mk.ukim.finki.backend.model.enumerations.Role;
import mk.ukim.finki.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserFormDto userFormDto){
        if(userFormDto.getRole() == null)
            userFormDto.setRole(Role.ROLE_USER);

        if(userFormDto.getRole().equals(Role.ROLE_ADMIN) && !SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(Role.ROLE_ADMIN)){
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        try{
            return this.userService.addUser(userFormDto)
                    .map(user -> ResponseEntity.ok().body("User registered"))
                    .orElseGet(() -> ResponseEntity.badRequest().body("User failed to register."));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles(){
        return List.of(Role.values());
    }

    @GetMapping("/role")
    public List<? extends GrantedAuthority> getLoggedUserRole(){
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().toList();
    }

    @GetMapping("/username")
    public String getLoggedUserUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        } else {
            return null;
        }
    }
}
