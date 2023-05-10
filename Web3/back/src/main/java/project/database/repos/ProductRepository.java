package project.database.repos;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.transaction.UserTransaction;
import project.database.entities.EProduct;
import project.model.dto.Product;
import project.model.interfaces.out.IRepositoryProduct;

public class ProductRepository implements IRepositoryProduct {

    @PersistenceUnit(unitName = "shopProject_PersistenceUnit")
    private EntityManagerFactory entityManagerFactory;

    private EntityManager entityManager;

    @Resource
    UserTransaction userTransaction;

    @Override
    public Product findById(Integer productId) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "select p from EProduct p where p.id=:id";
        Product product = new Product();
        try {
            EProduct eProduct = entityManager.createQuery(query, EProduct.class).getSingleResult();
            product.setId(eProduct.getId());
            product.setName(eProduct.getName());
            product.setPrice(eProduct.getPrice());
            product.setType(eProduct.getType());
        } catch (Exception e) {
        } finally {
            entityManager.close();
        }
        return product;
    }

    @Override
    public List<Product> findAll() {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "select p from EProduct p ";
        List<Product> products = new ArrayList<>();
        try {
            List<EProduct> eProducts = entityManager.createQuery(query, EProduct.class).getResultList();
            for (EProduct eProduct : eProducts) {
                Product product = new Product();
                product.setId(eProduct.getId());
                product.setName(eProduct.getName());
                product.setPrice(eProduct.getPrice());
                product.setType(eProduct.getType());
                products.add(product);
            }
        } catch (Exception e) {
        } finally {
            entityManager.close();
        }
        return products;
    }

    @Override
    public boolean addProduct(Product product) {
        entityManager = entityManagerFactory.createEntityManager();
        boolean status = true;
        try {
            EProduct eProduct = new EProduct();
            eProduct.setName(product.getName());
            eProduct.setPrice(product.getPrice());
            eProduct.setType(product.getType());
            userTransaction.begin();
            entityManager.joinTransaction();
            entityManager.persist(eProduct);
            userTransaction.commit();
        } catch (Exception e) {
            status = false;
        } finally {
            entityManager.close();
        }
        return status;
    }

    @Override
    public boolean deleteById(Integer productId) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "delete from EProduct p where p.id=:id";
        boolean status = true;
        Logger.getLogger(ProductRepository.class.getName()).info(String.valueOf(productId));
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            entityManager.createQuery(query, EProduct.class).setParameter("id", productId).executeUpdate();
            userTransaction.commit();
        } catch (Exception e) {
            status = false;
        }
        return status;
    }

}
