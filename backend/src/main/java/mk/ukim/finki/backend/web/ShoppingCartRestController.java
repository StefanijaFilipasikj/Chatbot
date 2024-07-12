package mk.ukim.finki.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.dto.form.ProductInCartFormDto;
import mk.ukim.finki.backend.model.dto.ShoppingCartDto;
import mk.ukim.finki.backend.service.ShoppingCartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/shopping-cart")
@AllArgsConstructor
public class ShoppingCartRestController {

    private final ShoppingCartService cartService;

    @GetMapping("/{username}")
    public ResponseEntity<ShoppingCartDto> findByUsername(@PathVariable String username) {
        return this.cartService.getShoppingCartByUsername(username)
                .map(cart -> ResponseEntity.ok().body(cart))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add-product")
    public ResponseEntity<ShoppingCartDto> addProductToShoppingCart(@RequestBody ProductInCartFormDto dto){
        return this.cartService.addProductToShoppingCart(dto)
                .map(cart -> ResponseEntity.ok().body(cart))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit-product/{id}")
    public ResponseEntity<ShoppingCartDto> editProductInShoppingCart(@PathVariable Long id, @RequestBody ProductInCartFormDto dto){
        return this.cartService.editProductInShoppingCart(id, dto)
                .map(cart -> ResponseEntity.ok().body(cart))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/remove-product/{id}")
    public ResponseEntity<ShoppingCartDto> removeProductFromShoppingCart(@PathVariable Long id){
        return this.cartService.removeProductFromShoppingCart(id)
                .map(cart -> ResponseEntity.ok().body(cart))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
