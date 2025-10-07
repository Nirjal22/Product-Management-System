package org.productmanagementsystem.dto;

import org.productmanagementsystem.model.Products;
import java.io.Serializable;
import java.util.Base64;

public class ProductsDto implements Serializable {
    private Long id;
    private String name;
    private String brand;
    private String category;
    private String warranty;
    private Integer price;
    private String pictureBase64; // Base64 string for frontend

    public ProductsDto(Products product) {
        this.id = product.getId();
        this.name = product.getName();
        this.brand = product.getBrand();
        this.category = product.getCategory();
        this.warranty = product.getWarranty();
        this.price = product.getPrice();
        if (product.getPicture() != null) {
            this.pictureBase64 = Base64.getEncoder().encodeToString(product.getPicture());
        }
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getBrand() { return brand; }
    public String getCategory() { return category; }
    public String getWarranty() { return warranty; }
    public Integer getPrice() { return price; }
    public String getPictureBase64() { return pictureBase64; }
}
