package login.websocket;

import javax.inject.Inject;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Controller
public class MessageController {

    private SimpMessagingTemplate template;
    Map<String, String> users = new HashMap();

    @Inject
    public MessageController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/message")
    @SendTo("/topic/response")
    public Response onMessage(ClientMessage message) throws Exception {
        Thread.sleep(10000); // simulated delay
        return new Response("Hello, " + message.getType() + "\n" + message.getData() + "!");
    }

    @MessageMapping("/chat")
//    @SendTo("/topic/response")
    public void onMessage(Message<Object> message, @Payload ClientMessage chatMessage) throws Exception {

        Thread.sleep(100); // simulated delay
        Principal principal = message.getHeaders().get(SimpMessageHeaderAccessor.USER_HEADER, Principal.class);
        String authedSender = principal.getName();
        String recipient = chatMessage.getRecipient();
        template.convertAndSendToUser(recipient, "/queue/messages", chatMessage);
    }

    @MessageMapping("/group/{groupName}")
    public void simple(@DestinationVariable String groupName, @Payload ClientMessage chatMessage) throws InterruptedException {
        Thread.sleep(100); // simulated delay;
        template.convertAndSend("/topic/group/" + groupName, chatMessage);
    }
}
