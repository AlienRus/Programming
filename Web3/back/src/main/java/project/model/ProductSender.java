package project.model;

import project.model.interfaces.in.IProductSender;
import project.model.interfaces.out.ISenderProduct;

public class ProductSender implements IProductSender {

    private ISenderProduct sender;

    @Override
    public void sendAll() {
        sender.sendAll();
    }

    @Override
    public void setSender(ISenderProduct sender) {
        this.sender = sender;
    }
    
}
