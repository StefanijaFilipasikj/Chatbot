package mk.ukim.finki.backend.config;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.BackendApplication;
import mk.ukim.finki.backend.model.*;
import mk.ukim.finki.backend.model.enumerations.Role;
import mk.ukim.finki.backend.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.Scanner;

@Component
@AllArgsConstructor
public class DataInitializer {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ShoppingCartRepository cartRepository;
    private final DescriptionRepository descriptionRepository;
    private final ProductInCartRepository productInCartRepository;
    private final ProductInOrderRepository productInOrderRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        User user = userRepository.save(new User("user", passwordEncoder.encode("user"), Role.ROLE_USER));
        User user2 = userRepository.save(new User("admin", passwordEncoder.encode("admin"), Role.ROLE_ADMIN));
        ShoppingCart cart = cartRepository.save(new ShoppingCart(user));

        ClassLoader loader = BackendApplication.class.getClassLoader();

        // Load products
        InputStream productsStream = loader.getResourceAsStream("csv/products.csv");
        Scanner productsScanner = new Scanner(productsStream, "UTF-8");
        productsScanner.nextLine();

        while (productsScanner.hasNextLine()) {
            String line = productsScanner.nextLine();
            String[] parts = line.split(",");
            Product product = new Product(Long.parseLong(parts[0]), parts[1], parts[2], Integer.parseInt(parts[3]), Double.parseDouble(parts[4]), Double.parseDouble(parts[5]), parts[6], parts[7]);
            this.productRepository.save(product);
        }

        // Load product descriptions
        InputStream descriptionsStream = loader.getResourceAsStream("csv/descriptions.csv");
        Scanner descriptionsScanner = new Scanner(descriptionsStream, "UTF-8");
        descriptionsScanner.nextLine();

        while (descriptionsScanner.hasNextLine()) {
            String line = descriptionsScanner.nextLine();
            String[] parts = line.split(",");
            Product product = this.productRepository.findById(Long.parseLong(parts[0])).get();
            Description description = new Description(parts[1], parts[2], product);
            this.descriptionRepository.save(description);
        }
    }
}
