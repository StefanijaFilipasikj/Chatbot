package mk.ukim.finki.backend.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.Description;
import mk.ukim.finki.backend.model.Product;
import mk.ukim.finki.backend.model.ShoppingCart;
import mk.ukim.finki.backend.model.dto.DescriptionDto;
import mk.ukim.finki.backend.model.dto.ProductDto;
import mk.ukim.finki.backend.model.dto.ProductInCartDto;
import mk.ukim.finki.backend.model.dto.ShoppingCartDto;
import mk.ukim.finki.backend.model.dto.form.ProductFormDto;
import mk.ukim.finki.backend.model.exceptions.CustomMessageException;
import mk.ukim.finki.backend.repository.DescriptionRepository;
import mk.ukim.finki.backend.repository.ProductInCartRepository;
import mk.ukim.finki.backend.repository.ProductInOrderRepository;
import mk.ukim.finki.backend.repository.ProductRepository;
import mk.ukim.finki.backend.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final DescriptionRepository descriptionRepository;
    private final ProductInCartRepository productInCartRepository;
    private final ProductInOrderRepository productInOrderRepository;

    @Override
    public List<Product> findAll() {
        return this.productRepository.findAll();
    }

    @Override
    public Page<Product> findAllWithPagination(Pageable pageable) {
        return this.productRepository.findAll(pageable);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return this.productRepository.findById(id);
    }

    @Override
    @Transactional
    public Optional<ProductDto> create(ProductFormDto dto) {
        Product product = new Product(dto.getUrl(), dto.getTitle(), dto.getWarranty(), dto.getRegularPrice(), dto.getHappyPrice(), dto.getImageUrl());
        Product savedProduct = productRepository.save(product);

        List<Description> descriptions = dto.getDescriptions().stream().map(d -> new Description(d.getKey(), d.getValue(), savedProduct)).toList();

        descriptions = descriptionRepository.saveAll(descriptions);
        return this.getProductDto(savedProduct);
    }

    @Override
    @Transactional
    public Optional<ProductDto> edit(Long id, ProductFormDto dto) {
        Product product = productRepository.findById(id).orElseThrow(() -> new CustomMessageException(String.format("Product with id: %d does not exist", id)));

        product.setUrl(dto.getUrl());
        product.setTitle(dto.getTitle());
        product.setWarranty(dto.getWarranty());
        product.setRegularPrice(dto.getRegularPrice());
        product.setHappyPrice(dto.getHappyPrice());
        Product savedProduct = productRepository.save(product);

        descriptionRepository.deleteAllByProduct(savedProduct);
        List<Description> descriptions = dto.getDescriptions().stream()
                .map(descDto -> new Description(descDto.getKey(), descDto.getValue(), savedProduct))
                .collect(Collectors.toList());
        descriptionRepository.saveAll(descriptions);

        return this.getProductDto(savedProduct);
    }

    @Override
    @Transactional
    public Optional<ProductDto> delete(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new CustomMessageException(String.format("Product with id: %d does not exist", id)));
        productInCartRepository.deleteAllByProduct(product);
        productInOrderRepository.deleteAllByProduct(product);
        productRepository.delete(product);
        return this.getProductDto(product);
    }

    private Optional<ProductDto> getProductDto(Product product) {
        List<DescriptionDto> descriptions = product.getDescriptions().stream()
                .map(description -> new DescriptionDto(
                        description.getId(),
                        description.getKey(),
                        description.getValue()
                )).collect(Collectors.toList());

        return Optional.of(new ProductDto(product.getId(), product.getUrl(), product.getTitle(), product.getWarranty(), product.getRegularPrice(), product.getHappyPrice(), product.getImageUrl(), descriptions));
    }
}
