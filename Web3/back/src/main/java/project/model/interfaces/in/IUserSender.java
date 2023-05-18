package project.model.interfaces.in;

import project.model.interfaces.out.ISenderUserWS;

public interface IUserSender {
    void sendAll();
    void setSender(ISenderUserWS sender);
}
