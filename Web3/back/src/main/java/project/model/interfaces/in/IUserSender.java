package project.model.interfaces.in;

import project.model.interfaces.out.ISenderUser;

public interface IUserSender {
    void sendAll();
    void setSender(ISenderUser sender);
}
