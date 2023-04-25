package project.model.interfaces.in;

import java.util.List;

import project.model.dto.Product;
import project.model.interfaces.out.IRepositoryProduct;

public interface IModelProduct {
    public void setRepository(IRepositoryProduct repositoryProduct);

    public boolean addProduct(Product product);

    public Product getProduct(Integer id);

    public List<Product> getAllProducts();

    public void deleteProduct(List<Product> productsId);
}
