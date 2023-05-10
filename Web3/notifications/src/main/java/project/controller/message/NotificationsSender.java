package project.controller.message;

import jakarta.annotation.Resource;
import jakarta.jms.ConnectionFactory;
import jakarta.jms.JMSContext;
import jakarta.jms.JMSProducer;
import jakarta.jms.Message;
import jakarta.jms.Queue;
import jakarta.jms.Topic;
import project.model.dto.Notification;
import project.model.interfaces.IPostman;

public class NotificationsSender implements IPostman {
    
    @Resource(mappedName = "jms/ConnectionFactory")    
    private ConnectionFactory connectionFactory;

    @Resource(mappedName = "jms/NotificationsQueue")
    private Queue queue;

    @Override
    public void send(Notification notification) {
        try {
            JMSContext context = connectionFactory.createContext();
            JMSProducer producer = context.createProducer();         
            Message message = context.createMessage();
            message.setJMSType("notification");
            message.setStringProperty("text", notification.getText());
            producer.send(queue, message);
            context.close();
          } catch (Exception e) {
            e.printStackTrace();
          }
    }


}
