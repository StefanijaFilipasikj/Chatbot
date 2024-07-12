package mk.ukim.finki.backend.service;

import mk.ukim.finki.backend.model.dto.OrderDto;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<OrderDto> getAllOrdersFromUser(String username);
    Optional<OrderDto> makeOrder(Long cartId);
}
