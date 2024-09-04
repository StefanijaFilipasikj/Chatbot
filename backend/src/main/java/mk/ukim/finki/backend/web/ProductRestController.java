package mk.ukim.finki.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.Product;
import mk.ukim.finki.backend.model.dto.ProductDto;
import mk.ukim.finki.backend.model.dto.form.ProductFormDto;
import mk.ukim.finki.backend.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public Page<Product> findAllWithPagination(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "12") int size){
        Pageable pageable = PageRequest.of(page, size);
        return productService.findAllWithPagination(pageable);
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
    public Page<Product> findByCategory(@PathVariable String category,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.findByCategory(category, pageable);
    }

    @GetMapping("/max-price")
    public double getMaxPrice() {
        return productService.getMaxProductPrice();
    }

    @GetMapping("/filter")
    public Page<Product> filterProductsByPrice(@RequestParam Double minPrice,
                                               @RequestParam Double maxPrice,
                                               @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.findByRegularPriceBetween(minPrice, maxPrice, pageable);
    }

    @GetMapping("/filter/{category}")
    public Page<Product> filterProductsByCategoryAndPrice(@PathVariable String category,
                                                          @RequestParam Double minPrice,
                                                          @RequestParam Double maxPrice,
                                                          @RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.findByCategoryAndRegularPriceBetween(category, minPrice, maxPrice, pageable);
    }

    @GetMapping("/search")
    public Page<Product> searchProducts(@RequestParam String query,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.searchProducts(query, pageable);
    }
}
