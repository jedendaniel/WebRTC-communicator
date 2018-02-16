package webrtcapi.websocket;

public class ClientMessage {
    String type;
    String recipient;
    String sender;
    String data;

    public ClientMessage() {
    }

    public ClientMessage(String type, String recipient, String sender, String data) {
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

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
