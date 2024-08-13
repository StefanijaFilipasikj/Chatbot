package mk.ukim.finki.backend.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.ShoppingCart;
import mk.ukim.finki.backend.model.User;
import mk.ukim.finki.backend.model.dto.form.UserFormDto;
import mk.ukim.finki.backend.model.exceptions.CustomMessageException;
import mk.ukim.finki.backend.model.exceptions.UsernameAlreadyExistsException;
import mk.ukim.finki.backend.repository.ShoppingCartRepository;
import mk.ukim.finki.backend.repository.UserRepository;
import mk.ukim.finki.backend.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ShoppingCartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }

    @Override
    public Optional<UserFormDto> addUser(UserFormDto dto) {
        if(dto.getUsername() == null || dto.getPassword() == null || dto.getUsername().isEmpty() || dto.getPassword().isEmpty())
            throw new CustomMessageException("Invalid username or password.");

        if(!dto.getPassword().equals(dto.getRepeatPassword()))
            throw new CustomMessageException("Passwords don't match!");

        if(userRepository.findByUsername(dto.getUsername()).isPresent())
            throw new UsernameAlreadyExistsException(dto.getUsername());

        User user = new User(dto.getUsername(), passwordEncoder.encode(dto.getPassword()), dto.getRole());
        userRepository.save(user);
        cartRepository.save(new ShoppingCart(user));
        return Optional.of(dto);
    }
}
