package mk.ukim.finki.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.backend.model.dto.OrderDto;
import mk.ukim.finki.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderRestController {

    private final OrderService orderService;

    @GetMapping("/{username}")
    List<OrderDto> getAllOrdersFromUser (@PathVariable String username){
        return this.orderService.getAllOrdersFromUser(username);
    }

    @PostMapping("/make-order/{cartId}")
    ResponseEntity<OrderDto> makeOrder(@PathVariable Long cartId) {
        return this.orderService.makeOrder(cartId)
                .map(order -> ResponseEntity.ok().body(order))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
