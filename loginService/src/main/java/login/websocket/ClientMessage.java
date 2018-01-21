package login.websocket;

public class ClientMessage {
    String type;
    String recipient;
    Object data;

    public ClientMessage() {
    }

    public ClientMessage(String type, String recipient, Object data) {
        this.type = type;
        this.recipient = recipient;
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

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
