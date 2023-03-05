package com.example.web.model.interfaces.product;

import java.util.ArrayList;

import pack.model.dto.Product;

public interface IProductRepository {
    ArrayList<Product> getProductsList() throws Exception;
    Boolean addProduct(String name, int price, String description) throws Exception;
    Boolean deleteProduct(int toDelete) throws Exception;
}