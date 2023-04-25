package project.controller.paths.websocket.message;

import jakarta.ejb.Schedule;
import jakarta.ejb.Stateless;

@Stateless
public class timerMessage {


    @Schedule(second = "10", minute = "*", hour = "*")
    public void init(){
        messageEndpoint.sendAll("Время пить чай!");
    }
}
