package mk.ukim.finki.backend.service;

import mk.ukim.finki.backend.model.dto.form.UserFormDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<UserFormDto> addUser(UserFormDto dto);
}
