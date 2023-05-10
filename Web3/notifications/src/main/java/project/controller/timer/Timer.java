package project.controller.timer;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;
import jakarta.ejb.Timeout;
import jakarta.ejb.TimerConfig;
import jakarta.ejb.TimerService;
import jakarta.inject.Inject;
import project.model.dto.Notification;
import project.model.interfaces.IPostman;

@Singleton
@Startup
public class Timer {

    private List<String> ads = List.of(
        "Если у вас возникли вопросы, обращайтесь на нашу горячую линию по номеру 88005553535",
        "Думаете что же купить? Посмотрите обзоры на товары! Недавно вышел новый обзор на наш товар: https://3dnews.ru/1076198/obzor-nvidia-geforce-rtx-4090"
    );

    private int index = 0;

    @Resource
    TimerService tservice; 

    @Inject
    IPostman postman;
    
    @PostConstruct    
    public void start() {
        tservice.createIntervalTimer(new Date(), 30000, new TimerConfig()); 
    }
  
    @Timeout
    public void timeout() {
        postman.send(new Notification(ads.get(index)));
        index = index == 1 ? 0 : 1;
    }
}