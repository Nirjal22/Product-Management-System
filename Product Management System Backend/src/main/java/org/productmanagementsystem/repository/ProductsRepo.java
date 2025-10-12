package org.productmanagementsystem.repository;

import org.productmanagementsystem.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepo extends JpaRepository<Products, Long> {

    @Query("SELECT p.id FROM Products p ORDER BY p.id ASC")
    List<Long> findAllIds();
}
