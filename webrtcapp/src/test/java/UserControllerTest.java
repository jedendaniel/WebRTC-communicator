import login.model.User;
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

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//import org.springframework.boot.context.embedded.LocalServerPort;

@RunWith(SpringRunner.class)
//@SpringBootTest
@SpringBootTest(classes = login.Application.class)
@AutoConfigureMockMvc
//@ContextConfiguration(classes=login.Application.class)
//@WebMvcTest(UserController.class)
public class UserControllerTest {

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

//    @LocalServerPort
//    private int port;
//    @Autowired
//    private MockMvc mockMvc;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @Autowired
    private MockMvc mockMvc;

//    @MockBean
//    private UserController controller;

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

    @Before
    public void setupTests() {
        user = new User("testUserName",
                "testUserLogin",
                "testUserPassword",
                "ROLE_USER", false);
    }

    // @Test
    // public void foundUserByLogin() throws Exception {
    //     this.mockMvc.perform(get("/api/User?login=ddaniel")
    //     ).andExpect(status().isFound())
    //     .andExpect(jsonPath("$.id", is("37")))
    //     .andExpect(jsonPath("$.name", is("Daniel")))
    //     .andExpect(jsonPath("$.login", is("ddaniel")))
    //     .andExpect(jsonPath("$.role", is("ROLE_USER")));
    // }

    // @Test
    // public void notFoundUserByLogin() throws Exception {
    //     this.mockMvc.perform(get("/api/User?login=not-ddaniel")
    //     ).andExpect(status().isNotFound());
    // }

    // @Test
    // public void badRequestUserByLogin() throws Exception {
    //     this.mockMvc.perform(get("/api/Userrrrr?login??")
    //     ).andExpect(status().isNotFound());
    // }

//    @Test
//    public void foundUserByLogin() throws Exception {
//
//        String userJson = json(user);
//
//        this.mockMvc.perform(get("/api/User?login=ddaniel")
////                    .contentType(contentType)
////                    .content(userJson)
//        ).andExpect(status().isFound());
//    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }

}
