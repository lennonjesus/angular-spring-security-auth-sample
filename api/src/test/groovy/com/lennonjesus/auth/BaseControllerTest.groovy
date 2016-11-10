package com.lennonjesus.auth

import org.springframework.test.web.servlet.MockMvc

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity
import org.junit.Before
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
class BaseControllerTest {

    protected MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).
                apply(springSecurity())
                .build();
    }

}
