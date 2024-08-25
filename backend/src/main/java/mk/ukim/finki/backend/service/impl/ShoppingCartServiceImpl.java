package mk.ukim.finki.backend.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.Product;
import mk.ukim.finki.backend.model.ProductInCart;
import mk.ukim.finki.backend.model.ShoppingCart;
import mk.ukim.finki.backend.model.User;
import mk.ukim.finki.backend.model.dto.*;
import mk.ukim.finki.backend.model.dto.form.ProductInCartFormDto;
import mk.ukim.finki.backend.model.exceptions.CustomMessageException;
import mk.ukim.finki.backend.repository.ProductInCartRepository;
import mk.ukim.finki.backend.repository.ProductRepository;
import mk.ukim.finki.backend.repository.UserRepository;
import mk.ukim.finki.backend.service.ShoppingCartService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductInCartRepository productInCartRepository;

    @Override
    public Optional<ShoppingCartDto> getShoppingCartByUsername (String username) {
        User user = userRepository.findById(username).orElseThrow(() -> new CustomMessageException(String.format("User with username: %s does not exist", username)));
        return this.getShoppingCartDto(user.getCart());
    }

    @Override
    public Optional<ShoppingCartDto> addProductToShoppingCart(ProductInCartFormDto dto) {
        User user = userRepository.findById(dto.getUsername()).orElseThrow(() -> new CustomMessageException(String.format("User with username: %s does not exist", dto.getUsername())));
        ShoppingCart cart = user.getCart();
        Product product = productRepository.findById(dto.getProductId()).orElseThrow(() -> new CustomMessageException(String.format("Product with id: %d does not exist", dto.getProductId())));
        List<ProductInCart> withSameProduct = cart.getProductsInCart().stream().filter(p -> p.getProduct().getId().equals(dto.getProductId())).toList();

        if(withSameProduct.isEmpty()){
            productInCartRepository.save(new ProductInCart(product, cart, dto.getQuantity()));
        }else{
            ProductInCart productInCart = withSameProduct.get(0);
            productInCart.setQuantity(productInCart.getQuantity() + dto.getQuantity());
            productInCartRepository.save(productInCart);
        }
        return this.getShoppingCartDto(cart);
    }

    @Override
    public Optional<ShoppingCartDto> editProductInShoppingCart(Long id, ProductInCartFormDto dto) {
        ProductInCart productInCart = productInCartRepository.findById(id).orElseThrow(() -> new CustomMessageException(String.format("ProductInCart with id: %d does not exist", id)));
        User user = userRepository.findById(dto.getUsername()).orElseThrow(() -> new CustomMessageException(String.format("User with username: %s does not exist", dto.getUsername())));
        ShoppingCart cart = user.getCart();

        List<ProductInCart> withSameProduct = cart.getProductsInCart().stream().filter(p -> !p.getId().equals(id) && p.getProduct().getId().equals(productInCart.getProduct().getId())).toList();
        if(withSameProduct.isEmpty()){
            productInCart.setQuantity(dto.getQuantity());
        }else{
            ProductInCart another = withSameProduct.get(0);
            productInCart.setQuantity(dto.getQuantity() + another.getQuantity());
            productInCartRepository.delete(another);
        }
        this.productInCartRepository.save(productInCart);
        return this.getShoppingCartDto(cart);
    }

    @Override
    public Optional<ShoppingCartDto> removeProductFromShoppingCart(Long id) {
        ProductInCart productInCart = productInCartRepository.findById(id).orElseThrow(() -> new CustomMessageException(String.format("ProductInCart with id: %d does not exist", id)));
        productInCartRepository.delete(productInCart);
        return this.getShoppingCartDto(productInCart.getCart());
    }

    private Optional<ShoppingCartDto> getShoppingCartDto(ShoppingCart cart) {
        List<ProductInCartDto> productInCartDTOs = cart.getProductsInCart().stream()
                .map(productInCart -> new ProductInCartDto(
                        productInCart.getId(),
                        new ProductDto(
                                productInCart.getProduct().getId(),
                                productInCart.getProduct().getUrl(),
                                productInCart.getProduct().getTitle(),
                                productInCart.getProduct().getWarranty(),
                                productInCart.getProduct().getRegularPrice(),
                                productInCart.getProduct().getHappyPrice(),
                                productInCart.getProduct().getCategory(),
                                productInCart.getProduct().getImageUrl(),
                                productInCart.getProduct().getDescriptions()
                                        .stream().map(description -> new DescriptionDto(
                                                description.getId(),
                                                description.getKey(),
                                                description.getValue()
                                        )).collect(Collectors.toList())
                        ),
                        productInCart.getQuantity()
                )).collect(Collectors.toList());

        return Optional.of(new ShoppingCartDto(cart.getId(), productInCartDTOs, cart.getUser().getUsername()));
    }
}
