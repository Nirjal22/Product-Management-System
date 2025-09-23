package org.productmanagementsystem.repository;

import org.productmanagementsystem.model.Products;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductsRepo extends CrudRepository<Products, Integer> {

    Products findAllProductsByCategory(String category);

    Products findAllProductsByName(String name);

    Products findAllProductsByBrand(String brand);

}
