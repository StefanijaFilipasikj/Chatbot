package mk.ukim.finki.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.Product;
import mk.ukim.finki.backend.model.dto.ProductDto;
import mk.ukim.finki.backend.model.dto.form.ProductFormDto;
import mk.ukim.finki.backend.service.ProductService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductRestController {

    private final ProductService productService;

    @GetMapping
    public List<Product> findAll() {
        return this.productService.findAll();
    }

    @GetMapping("/pagination")
    public List<Product> findAllWithPagination(Pageable pageable){
        return this.productService.findAllWithPagination(pageable).getContent();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        return this.productService.findById(id)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> save(@RequestBody ProductFormDto productDto) {
        return this.productService.create(productDto)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> save(@PathVariable Long id, @RequestBody ProductFormDto productDto) {
        return this.productService.edit(id, productDto)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> deleteById(@PathVariable Long id) {
        this.productService.delete(id);
        if(this.productService.findById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/categories")
    public List<String> getAllCategories() {
        return this.productService.findAllCategories();
    }

    @GetMapping("/category/{category}")
    public List<Product> findByCategory(@PathVariable String category) {
        return this.productService.findByCategory(category);
    }

    @GetMapping("/max-price")
    public double getMaxPrice() {
        return productService.getMaxProductPrice();
    }

    @GetMapping("/filter")
    public List<Product> filterProductsByPrice(@RequestParam double minPrice, @RequestParam double maxPrice) {
        return this.productService.findByRegularPriceBetween(minPrice, maxPrice);
    }

    @GetMapping("/filter/{category}")
    public List<Product> filterProductsByCategoryAndPrice(@PathVariable String category,
                                                          @RequestParam double minPrice,
                                                          @RequestParam double maxPrice) {
        return this.productService.findByCategoryAndRegularPriceBetween(category, minPrice, maxPrice);
    }
}
