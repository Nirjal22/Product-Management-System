package org.productmanagementsystem.service;

import org.productmanagementsystem.model.Products;
import org.productmanagementsystem.repository.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepo repo;

    public Products save(Products product) {
        return repo.save(product);
    }

    public List<Products> getAllProducts() {
        return repo.findAll();
    }

    public void deleteProducts(Long id) {
        repo.deleteById(id);
    }

    public Products updateProducts(Products product) {
        return repo.save(product);
    }

}
