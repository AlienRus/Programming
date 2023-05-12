package project.controller.message;

import jakarta.ejb.MessageDriven;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.MessageListener;
import project.controller.websocket.message.messageEndpoint;

@MessageDriven(mappedName = "jms/NotificationsQueue")
public class ListenerNotifications implements MessageListener {

    @Override
    public void onMessage(Message message) {
        try {
            String text = message.getStringProperty("text");
            messageEndpoint.sendAll(text);
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
    
}
