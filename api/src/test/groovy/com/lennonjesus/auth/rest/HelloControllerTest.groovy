package com.lennonjesus.auth.rest

import com.lennonjesus.auth.BaseControllerTest
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.MockitoAnnotations
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.web.FilterChainProxy
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.web.servlet.setup.MockMvcBuilders

import static org.junit.Assert.assertEquals
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@RunWith(SpringJUnit4ClassRunner.class)

class HelloControllerTest extends BaseControllerTest{

    @InjectMocks
    def HelloController helloController

    @Autowired
    private FilterChainProxy filterChainProxy;


    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this)

        this.mockMvc = MockMvcBuilders.standaloneSetup(helloController).addFilter(filterChainProxy)build();
    }

    @Test
    public void "Deve exibir erro com status unauthorized"(){
        mockMvc.perform(get("/hello")).andExpect(status().isUnauthorized())
    }

    @Test
    public void "Deve exibir texto de usuario autenticado"(){

        final def retorno = "Hello, authenticated user."
        def result = mockMvc.perform(get("/hello").with(user("user").password("user").roles("USER"))).andExpect(status().isOk()).andReturn()

        assertEquals("Deveria retorna texto igual a",retorno ,result.response.contentAsString)
    }
}
