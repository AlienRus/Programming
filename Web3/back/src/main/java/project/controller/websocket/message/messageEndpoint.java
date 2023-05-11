package project.controller.paths.websocket.message;

import java.util.concurrent.ConcurrentLinkedQueue;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint("/message")
public class messageEndpoint {
    private final static ConcurrentLinkedQueue<Session> queue = new ConcurrentLinkedQueue<>();

    @OnOpen
    public void connectionOpened(Session session) {
        queue.add(session);
    }

    @OnClose
    public void connectionClosed(Session session) {
        queue.remove(session);
    }

    public static void sendAll(String massage) {
        for (Session sess : queue) {
            if (sess.isOpen()) {
                sess.getAsyncRemote().sendText(massage);
            }
        }
    }

}
