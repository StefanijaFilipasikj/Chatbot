package mk.ukim.finki.backend.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.Order;
import mk.ukim.finki.backend.model.ProductInOrder;
import mk.ukim.finki.backend.model.ShoppingCart;
import mk.ukim.finki.backend.model.dto.*;
import mk.ukim.finki.backend.model.exceptions.CustomMessageException;
import mk.ukim.finki.backend.repository.OrderRepository;
import mk.ukim.finki.backend.repository.ProductInCartRepository;
import mk.ukim.finki.backend.repository.ProductInOrderRepository;
import mk.ukim.finki.backend.repository.ShoppingCartRepository;
import mk.ukim.finki.backend.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final ShoppingCartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final ProductInOrderRepository productInOrderRepository;
    private final ProductInCartRepository productInCartRepository;

    @Override
    public List<OrderDto> getAllOrdersFromUser(String username){
        return orderRepository.findAll().stream().filter(o -> o.getUser().getUsername().equals(username))
                .map(o -> this.getOrderDto(o).get()).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Optional<OrderDto> makeOrder(Long cartId) {
        ShoppingCart shoppingCart = cartRepository.findById(cartId).orElseThrow(() -> new CustomMessageException(String.format("ShoppingCart with id: %d does not exist", cartId)));
        Order order = new Order(shoppingCart.getUser());

        List<ProductInOrder> productsInOrder = shoppingCart.getProductsInCart().stream()
                .map(p -> new ProductInOrder(p.getProduct(), order, p.getQuantity())).toList();

        productsInOrder = productInOrderRepository.saveAll(productsInOrder);
        order.setProductsInOrder(productsInOrder);
        orderRepository.save(order);
        productInCartRepository.deleteAll(shoppingCart.getProductsInCart());

        return this.getOrderDto(order);
    }

    private Optional<OrderDto> getOrderDto(Order order) {
        List<ProductInOrderDto> productInOrderDTOs = order.getProductsInOrder().stream()
                .map(productInOrder -> new ProductInOrderDto(
                        productInOrder.getId(),
                        new ProductDto(
                                productInOrder.getProduct().getId(),
                                productInOrder.getProduct().getUrl(),
                                productInOrder.getProduct().getTitle(),
                                productInOrder.getProduct().getWarranty(),
                                productInOrder.getProduct().getRegularPrice(),
                                productInOrder.getProduct().getHappyPrice(),
                                productInOrder.getProduct().getCategory(),
                                productInOrder.getProduct().getImageUrl(),
                                productInOrder.getProduct().getDescriptions()
                                        .stream().map(description -> new DescriptionDto(
                                                description.getId(),
                                                description.getKey(),
                                                description.getValue()
                                        )).collect(Collectors.toList())
                        ),
                        productInOrder.getQuantity()
                )).collect(Collectors.toList());

        return Optional.of(new OrderDto(order.getId(), order.getOrderedAt(), productInOrderDTOs, order.getUser().getUsername()));
    }
}
