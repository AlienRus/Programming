package project.model;

import java.util.List;

import project.model.dto.Order;
import project.model.interfaces.in.IModelOrder;
import project.model.interfaces.out.IRepositoryOrder;

public class OrderModel implements IModelOrder {

    private IRepositoryOrder repositoryOrder;

    @Override
    public void setRepository(IRepositoryOrder repositoryOrder) {
        this.repositoryOrder = repositoryOrder;
    }

    @Override
    public List<Order> getUserOrders(String login) {
        return repositoryOrder.findByLogin(login);
    }

    @Override
    public boolean changeStatusOrder(Order order) {
        Order foundOrder = repositoryOrder.findById(order.getId());
        String status = foundOrder.getStatus();
        if (status.equals("Выполняется")){
            foundOrder.setStatus("Выполнен");
        } else {
            return true;
        }
        return repositoryOrder.setOrderStatus(foundOrder.getId(), foundOrder.getStatus());
    }

    @Override
    public boolean addOrder(String login, Order order) {
        return repositoryOrder.addOrder(login, order);
    }

    @Override
    public List<Order> getAllOrders() {
        return repositoryOrder.findAll();
    }

    
}
