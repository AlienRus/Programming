package com.example.web.builder.product;

import pack.builder.Built;
import pack.model.interfaces.product.IProductModel;
import pack.model.interfaces.product.IProductRepository;

import jakarta.inject.Inject;
import jakarta.enterprise.inject.Produces;
import jakarta.enterprise.inject.Default;

public class ProductBuilder { 

    @Inject @Default
    private IProductModel model;

    @Inject @Default
    private IProductRepository repository;

    @Produces @Built
    public IProductModel buildModel() {
	   model.injectRepository(repository);
       return model;
    } 
}