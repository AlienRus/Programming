package project.model;

import java.util.List;

import project.model.dto.Product;
import project.model.interfaces.in.IModelProduct;
import project.model.interfaces.out.IRepositoryProduct;

public class ProductModel implements IModelProduct {

    private IRepositoryProduct repositoryProduct;

    @Override
    public void setRepository(IRepositoryProduct repositoryProduct) {
        this.repositoryProduct = repositoryProduct;
    }

    @Override
    public boolean addProduct(Product product) {
        return repositoryProduct.addProduct(product);
    }

    @Override
    public Product getProduct(Integer id) {
        return repositoryProduct.findById(id);
    }

    @Override
    public void deleteProduct(List<Product> productsId) {
        for (Product product : productsId) {
            repositoryProduct.deleteById(product.getId());
        }
    }

    @Override
    public List<Product> getAllProducts() {
        return repositoryProduct.findAll();
    }
    
}
