package project.model;

import project.model.interfaces.in.IUserSender;
import project.model.interfaces.out.ISenderUser;

public class UserSender implements IUserSender {

    private ISenderUser sender;

    @Override
    public void sendAll() {
        sender.sendAll();
    }

    @Override
    public void setSender(ISenderUser sender) {
        this.sender = sender;
    }
    
}
