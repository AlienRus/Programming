package project.model.interfaces.in;

import project.model.interfaces.out.ISenderProductWs;

public interface IProductSender {
    void sendAll();
    void setSender(ISenderProductWs sender);
}
