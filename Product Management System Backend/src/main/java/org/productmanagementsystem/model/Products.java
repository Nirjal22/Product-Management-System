package org.productmanagementsystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Products {

    @Id
    private Long id;

    private String name;
    private String brand;
    private String category;
    private String warranty;
    private Integer price;

    @Lob
    private byte[] picture;
}
