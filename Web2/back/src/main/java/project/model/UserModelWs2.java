package project.model;

import java.util.concurrent.ConcurrentLinkedQueue;

import jakarta.annotation.Resource;
import jakarta.enterprise.concurrent.ManagedExecutorService;
import jakarta.websocket.Session;
import project.model.interfaces.in.IModelUserWs2;

public class UserModelWs2  implements IModelUserWs2{

    @Resource
    ManagedExecutorService mes;

    private final static ConcurrentLinkedQueue<Session> queue = new ConcurrentLinkedQueue<>();

    @Override
    public void addSession(Session session) {
        mes.execute(() -> {
            queue.add(session);
        });
    }

    @Override
    public void removeSession(Session session) {
        mes.execute(() -> {
            queue.remove(session);
        });
    }

    @Override
    public void sendMessage(String message) {
        mes.execute(() -> {
            for (Session session : queue) {
                if (session.isOpen()) {
                    if (message == null) {
                        session.getAsyncRemote().sendObject(true);
                    } else {
                        session.getAsyncRemote().sendText(message);
                    }
                }
            }
        });
    }

    @Override
    public void sendAll() {
        mes.execute(() -> {
            for (Session session : queue) {
                if (session.isOpen()) {
                    session.getAsyncRemote().sendObject(true);
                }
            }
        });
    }
    
}
