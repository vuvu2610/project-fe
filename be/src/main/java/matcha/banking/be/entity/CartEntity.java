package matcha.banking.be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "carts")
@Data
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "customer_id")
    private UserEntity customer;

    @OneToMany(mappedBy = "cart")
    private List<CartItemEntity> listCartItem;
}
