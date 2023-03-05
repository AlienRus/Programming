package com.example.web.model.product;

import java.util.ArrayList;

import pack.model.dto.Product;
import pack.model.interfaces.product.IProductRepository;
import pack.model.interfaces.product.IProductModel;

public class ProductModel implements IProductModel {

    IProductRepository repository;

    @Override
    public void injectRepository(IProductRepository repository) {
        this.repository = repository;
    } 

    @Override
    public ArrayList<Product> getProductsList() throws Exception {
        return repository.getProductsList();
    }

    @Override
    public Boolean addProduct(Product product) throws Exception {
        return repository.addProduct(product.getName(), product.getPrice(), product.getDescription());
    }

    @Override
    public Boolean deleteProduct(int toDelete) throws Exception {
        return repository.deleteProduct(toDelete);
    }
}