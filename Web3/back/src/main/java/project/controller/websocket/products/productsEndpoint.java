package project.controller.paths.websocket.products;

import jakarta.inject.Inject;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import project.model.interfaces.in.IModelProductWs2;

@ServerEndpoint("/asyncProducts")
public class productsEndpoint {

    @Inject
    IModelProductWs2 modelProductWs;
    
    @OnOpen
    public void connectionOpen(Session session){
        modelProductWs.addSession(session);
    }

    @OnMessage
    public void messageProcess(Session session, String message) {
        modelProductWs.sendAll();
    }

    @OnClose
    public void connectionClose(Session session) {
        modelProductWs.removeSession(session);
    }
}
