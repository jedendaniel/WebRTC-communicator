package login.websocket;

public class ClientMessage {
    String type;
    String recipient;
    String sender;
    Object data;

    public ClientMessage() {
    }

    public ClientMessage(String type, String recipient, String sender, Object data) {
        this.type = type;
        this.recipient = recipient;
        this.sender = sender;
        this.data = data;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
