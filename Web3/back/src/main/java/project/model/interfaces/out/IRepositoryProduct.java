package project.model.interfaces.out;

import java.util.List;

import project.model.dto.Product;

public interface IRepositoryProduct {
    public Product findById(Integer productId);

    public List<Product> findAll();

    public boolean addProduct(Product product);

    public boolean deleteById(Integer productId);
}
