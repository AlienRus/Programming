package com.example.web.model.interfaces.product;

import java.util.ArrayList;

import pack.model.dto.Product;

public interface IProductModel {
    void injectRepository(IProductRepository repository);
    ArrayList<Product> getProductsList() throws Exception;
    Boolean addProduct(Product product) throws Exception;
    Boolean deleteProduct(int toDelete) throws Exception;
}