package mk.ukim.finki.backend.config;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.*;
import mk.ukim.finki.backend.model.enumerations.Role;
import mk.ukim.finki.backend.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DataInitializer {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ShoppingCartRepository cartRepository;
    private final DescriptionRepository descriptionRepository;
    private final ProductInCartRepository productInCartRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        User user = userRepository.save(new User("user", passwordEncoder.encode("user"), Role.ROLE_USER));
        ShoppingCart cart = cartRepository.save(new ShoppingCart(user));

        Product product = productRepository.save(new Product("https://www.neptun.mk/categories/prenosni_kompjuteri/ACER-Aspire-3-A315-58-54EF-i5-1135G7-8GB-512GB", "ЛАПТОП ACER ASPIRE 3 A315-58-54EF I5-1135G7/8GB/512GB/WIN11", 24, 32.999, 26.499, "https://www.neptun.mk/2023/05/18/Acer_c03e89e0-ab6c-4513-a158-960c1ab9fcef.JPG"));
        Description desc1 = descriptionRepository.save(new Description("Лаптоп", "true", product));
        Description desc2 = descriptionRepository.save(new Description("Полнач", "45W", product));

        ProductInCart productInCart1 = productInCartRepository.save(new ProductInCart(product, cart, 1));
    }
}
