package login.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MessageController {

    Map<String, String> users = new HashMap();

    @MessageMapping("/answer")
    @SendTo("/client/response")
    public Response onMessage(ClientMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Response("Hello, " + message.getType() + "\n" + message.getData() + "!");
    }

}
