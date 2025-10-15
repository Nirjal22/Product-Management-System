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

    public Products saving(Products product) {
        List<Long> ids = repo.findAllIds();
        Long nextId = 1L;

        for (Long id : ids) {
            if (!id.equals(nextId)) break; // found a gap
            nextId++;
        }

        product.setId(nextId);
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

    public Products getProductById(Long id) {
        return repo.findById(id).orElse(null);
    }

}
