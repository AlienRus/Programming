package project.model.interfaces;

import project.model.dto.Notification;

public interface IPostman {
    void send(Notification notification);
}
