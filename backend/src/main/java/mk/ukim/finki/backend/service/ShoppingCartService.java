package mk.ukim.finki.backend.service;

import mk.ukim.finki.backend.model.dto.form.ProductInCartFormDto;
import mk.ukim.finki.backend.model.dto.ShoppingCartDto;

import java.util.Optional;

public interface ShoppingCartService {
    Optional<ShoppingCartDto> getShoppingCartByUsername(String username);
    Optional<ShoppingCartDto> addProductToShoppingCart(ProductInCartFormDto dto);
    Optional<ShoppingCartDto> editProductInShoppingCart(Long id, ProductInCartFormDto dto);
    Optional<ShoppingCartDto> removeProductFromShoppingCart(Long id);
}
