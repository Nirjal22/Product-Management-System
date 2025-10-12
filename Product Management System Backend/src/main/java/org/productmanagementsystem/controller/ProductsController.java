package org.productmanagementsystem.controller;

import org.productmanagementsystem.dto.ProductsDto;
import org.productmanagementsystem.model.Products;
import org.productmanagementsystem.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductsService service;

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Products save(
            @RequestParam String name,
            @RequestParam String brand,
            @RequestParam String category,
            @RequestParam(required = false) String warranty,
            @RequestParam String price,
            @RequestParam(required = false) MultipartFile picture
    ) {
        Products product = new Products();
        product.setName(name);
        product.setBrand(brand);
        product.setCategory(category);
        product.setWarranty(warranty);
        product.setPrice(Integer.parseInt(price));

        if (picture != null) {
            try {
                product.setPicture(picture.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return service.saving(product);
    }

    @GetMapping("/viewProducts")
    public List<ProductsDto> view() {
        return service.getAllProducts()
                .stream()
                .map(ProductsDto::new)
                .collect(Collectors.toList());
    }

    @PutMapping("/updateProduct/{id}")
    public Products updating(Products products) {
        return service.updateProducts(products);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public void deleting(@PathVariable Long id) {
        service.deleteProducts(id);
    }

}
