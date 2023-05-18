package project.model;

import project.model.interfaces.in.IProductSender;
import project.model.interfaces.out.ISenderProductWs;

public class ProductSender implements IProductSender {

    private ISenderProductWs sender;

    @Override
    public void sendAll() {
        sender.sendAll();
    }

    @Override
    public void setSender(ISenderProductWs sender) {
        this.sender = sender;
    }
    
}
