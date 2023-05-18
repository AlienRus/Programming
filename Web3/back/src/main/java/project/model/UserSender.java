package project.model;

import project.model.interfaces.in.IUserSender;
import project.model.interfaces.out.ISenderUserWS;

public class UserSender implements IUserSender {

    private ISenderUserWS sender;

    @Override
    public void sendAll() {
        sender.sendAll();
    }

    @Override
    public void setSender(ISenderUserWS sender) {
        this.sender = sender;
    }
    
}
