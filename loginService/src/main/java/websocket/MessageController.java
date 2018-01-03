package websocket;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

public class MessageController {

    @MessageMapping("/message")
    @SendTo("/websocket/messages")
    public ResponseEntity greeting(Message message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new ResponseEntity(HttpStatus.OK);
    }
}
