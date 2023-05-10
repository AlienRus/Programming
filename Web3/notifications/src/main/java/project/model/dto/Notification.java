package project.model.dto;

public class Notification {
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Notification(String text){
        this.text = text;
    }
}
