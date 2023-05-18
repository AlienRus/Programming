package project.controller.websocket.products;

import java.util.concurrent.ConcurrentLinkedQueue;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import project.model.interfaces.out.ISenderProductWs;

@ServerEndpoint("/asyncProducts")
public class productEndpoint implements ISenderProductWs {

    private final static ConcurrentLinkedQueue<Session> queue = new ConcurrentLinkedQueue<>();

    @OnOpen
    public void onOpen(Session session){
        queue.add(session);
    }

    @OnClose
    public void onClose(Session session){
        queue.remove(session);
    }

    @OnMessage
    public void OnMessage(String message){
        for (Session session : queue) {
            if (session.isOpen()) {
                session.getAsyncRemote().sendText(message);
            }
        }
    }

    @Override
    public void sendAll() {
        for (Session session : queue) {
            if (session.isOpen()) {
                session.getAsyncRemote().sendObject(true);
            }
        }
    }
    
}
