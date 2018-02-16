import webrtcapi.controller.UserController;
import webrtcapi.dao.IUserDAO;
import webrtcapi.model.User;
import webrtcapi.service.IUserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.Arrays;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = webrtcapi.Application.class)
@AutoConfigureMockMvc
public class UserControllerTest {

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IUserDAO userDAO;

    @Autowired
    private IUserService userService;

    @Autowired
    private UserController userController;

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {

        this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .orElse(null);

        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }

    private User user;

    private String encoding;

    @Before
    public void setupTests() {
        try {
            encoding = DatatypeConverter.printBase64Binary("asd:asd".getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        user = new User("testUserName",
                "testUserLogin",
                "testUserPassword",
                "ROLE_USER", false);
    }

    @Test
    public void createNewAccountDouble() throws Exception {
        this.mockMvc.perform(post("/public/newAccount")
                .contentType(contentType)
                .content(json(user))
        ).andExpect(status().isConflict());
    }

    @Test
    public void foundUserByLogin() throws Exception {
        this.mockMvc.perform(get("/api/user?login=testUserLogin")
                .header("Authorization", "Basic " + encoding)
        ).andExpect(status().isOk())
                .andExpect(jsonPath("$.login", is(user.getLogin())))
                .andExpect(jsonPath("$.name", is(user.getName())))
                .andExpect(jsonPath("$.role", is(user.getRole())));
    }

    @Test
    public void notFoundUserByLogin() throws Exception {
        this.mockMvc.perform(get("/api/User?login=not" + user.getLogin())
                .header("Authorization", "Basic " + encoding)
        ).andExpect(status().isNotFound());
    }

    @Test
    public void badRequestUserByLogin() throws Exception {
        this.mockMvc.perform(get("/api/Userrrrr?login??")
                .header("Authorization", "Basic " + encoding)
        ).andExpect(status().isNotFound());
    }

    @Test
    public void updateUsersLogin() throws Exception{
        User[] users = {new User(null, user.getName(),null,null,null),user};
        this.mockMvc.perform(patch("/api/users")
                .header("Authorization", "Basic " + encoding)
                .contentType(contentType)
                .content(json(users))
        ).andExpect(status().isConflict());
    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }

}
