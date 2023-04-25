package project.model.interfaces.in;

import java.util.List;

import project.model.dto.Order;
import project.model.interfaces.out.IRepositoryOrder;

public interface IModelOrder {

    public void setRepository(IRepositoryOrder repositoryOrder);

    public List<Order> getUserOrders(String login);

    public List<Order> getAllOrders();

    public boolean changeStatusOrder(Order order);

    public boolean addOrder(String login, Order order);
}
