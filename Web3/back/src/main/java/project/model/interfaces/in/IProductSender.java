package project.model.interfaces.in;

import project.model.interfaces.out.ISenderProduct;

public interface IProductSender {
    void sendAll();
    void setSender(ISenderProduct sender);
}
