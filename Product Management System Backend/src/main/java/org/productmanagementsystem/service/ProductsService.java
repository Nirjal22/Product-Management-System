package org.productmanagementsystem.service;

import org.productmanagementsystem.model.Products;
import org.productmanagementsystem.repository.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepo repo;

    //Create
    public Products saveProduct(){
        return repo.save(new Products());
    }

    public Products findAllProductsByCategory(String category){
        return repo.findAllProductsByCategory(category);
    };

    public Products findAllProductsByName(String name){
        return repo.findAllProductsByName(name);
    };

    public Products findAllProductsByBrand(String brand){
        return repo.findAllProductsByBrand(brand);
    }
}
