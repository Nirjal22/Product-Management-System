package org.productmanagementsystem.model;

import jakarta.persistence.*;

@Entity
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private String category;
    private String warranty;
    private Integer price;

    @Lob
    private byte[] picture;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getWarranty() { return warranty; }
    public void setWarranty(String warranty) { this.warranty = warranty; }

    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }

    public byte[] getPicture() { return picture; }
    public void setPicture(byte[] picture) { this.picture = picture; }
}
