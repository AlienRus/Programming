package project.database.repos;

import java.util.ArrayList;
import java.util.List;

import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.transaction.UserTransaction;
import project.database.entities.EOrder;
import project.database.entities.EOrderProduct;
import project.database.entities.EProduct;
import project.database.entities.EUser;
import project.model.dto.Order;
import project.model.dto.Product;
import project.model.interfaces.out.IRepositoryOrder;

public class OrderRepository implements IRepositoryOrder {

    @PersistenceUnit(unitName = "shopProject_PersistenceUnit")
    private EntityManagerFactory entityManagerFactory;

    private EntityManager entityManager;

    @Resource
    UserTransaction userTransaction;

    @Override
    public List<Order> findByLogin(String login) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "select o from EOrder o where o.user.login=:login";
        List<Order> orders = new ArrayList<>();
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            List<EOrder> eOrders = entityManager.createQuery(query, EOrder.class).setParameter("login", login)
                    .getResultList();
            for (EOrder eOrder : eOrders) {
                Order order = new Order();
                List<Product> orderProducts = getProductsFromOrder(eOrder.getId());
                order.setId(eOrder.getId());
                order.setId_user(eOrder.getUser().getId());
                order.setProducts(orderProducts);
                order.setStatus(eOrder.getStatus());
                order.setCreatedAt(eOrder.getCreatedAt());
                order.setTotalPrice(eOrder.getTotalPrice());
                orders.add(order);
            }
            userTransaction.commit();
        } catch (Exception e) {
        } finally {
            entityManager.close();
        }
        return orders;
    }

    public List<Product> getProductsFromOrder(Integer id) {
        List<Product> orderProducts = new ArrayList<>();
        String query = "select op from EOrderProduct op where op.order.id=:id";
        List<EOrderProduct> eOrderProducts = entityManager.createQuery(query, EOrderProduct.class)
                .setParameter("id", id).getResultList();
        for (EOrderProduct eOrderProduct : eOrderProducts) {
            Product product = new Product();
            product.setId(eOrderProduct.getProduct().getId());
            product.setName(eOrderProduct.getProduct().getName());
            product.setPrice(eOrderProduct.getProduct().getPrice());
            product.setType(eOrderProduct.getProduct().getType());
            product.setQuantity(eOrderProduct.getQuantity());
            orderProducts.add(product);
        }
        return orderProducts;
    }

    @Override
    public boolean setOrderStatus(Integer id, String orderStatus) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "update EOrder o set o.status=:status where o.id=:id";
        Boolean status = true;
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            entityManager.createQuery(query, EOrder.class).setParameter("status", orderStatus).setParameter("id", id)
                    .executeUpdate();
            userTransaction.commit();
        } catch (Exception e) {
            status = false;
        }
        return status;
    }

    @Override
    public boolean addOrder(String login, Order order) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "select u from EUser u where u.login=:login";
        Boolean status = true;
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            EUser eUser = entityManager.createQuery(query, EUser.class).setParameter("login", login).getSingleResult();
            EOrder eOrder = new EOrder();
            eOrder.setUser(eUser);
            eOrder.setStatus("Выполняется");
            eOrder.setTotalPrice(order.getTotalPrice());
            entityManager.persist(eOrder);
            addProductOrder(eOrder, order.getProducts());
            userTransaction.commit();
        } catch (Exception e) {
            status = false;
        }
        return status;
    }

    public void addProductOrder(EOrder eOrder, List<Product> products) {
        String query = "select p from EProduct p where p.id=:id";
        for (Product product : products) {
            EProduct eProduct = entityManager.createQuery(query, EProduct.class).setParameter("id", product.getId())
                    .getSingleResult();
            EOrderProduct eOrderProduct = new EOrderProduct();
            eOrderProduct.setOrder(eOrder);
            eOrderProduct.setQuantity(product.getQuantity());
            eOrderProduct.setProduct(eProduct);
            entityManager.persist(eOrderProduct);
        }
    }

    @Override
    public List<Order> findAll() {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "select o from EOrder o";
        List<Order> orders = new ArrayList<>();
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            List<EOrder> eOrders = entityManager.createQuery(query, EOrder.class).getResultList();
            for (EOrder eOrder : eOrders) {
                Order order = new Order();
                List<Product> orderProducts = getProductsFromOrder(eOrder.getId());
                order.setId(eOrder.getId());
                order.setId_user(eOrder.getUser().getId());
                order.setProducts(orderProducts);
                order.setStatus(eOrder.getStatus());
                order.setCreatedAt(eOrder.getCreatedAt());
                order.setTotalPrice(eOrder.getTotalPrice());
                orders.add(order);
            }
            userTransaction.commit();
        } catch (Exception e) {
        } finally {
            entityManager.close();
        }
        return orders;
    }

    @Override
    public Order findById(Integer id) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "select o from EOrder o where o.id=:id";
        Order order = new Order();
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            EOrder eOrder = entityManager.createQuery(query, EOrder.class).setParameter("id", id).getSingleResult();
            List<Product> orderProducts = getProductsFromOrder(eOrder.getId());
            userTransaction.commit();
            order.setId(eOrder.getId());
            order.setId_user(eOrder.getUser().getId());
            order.setProducts(orderProducts);
            order.setStatus(eOrder.getStatus());
            order.setCreatedAt(eOrder.getCreatedAt());
            order.setTotalPrice(eOrder.getTotalPrice());
        } catch (Exception e) {
        }
        return order;
    }

}
