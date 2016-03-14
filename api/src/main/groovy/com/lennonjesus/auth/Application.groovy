package com.lennonjesus.auth

import com.lennonjesus.auth.aop.OnSuccessAdvice
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAutoConfiguration
import org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration
import org.springframework.boot.autoconfigure.web.ErrorMvcAutoConfiguration
import org.springframework.boot.autoconfigure.websocket.WebSocketAutoConfiguration
import org.springframework.boot.context.embedded.FilterRegistrationBean
import org.springframework.boot.context.web.SpringBootServletInitializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.web.servlet.config.annotation.EnableWebMvc

import javax.servlet.Filter

/**
 * @author Lennon Jesus
 */
@ComponentScan(basePackages = ["com.lennonjesus.auth"])
@Configuration
@EnableWebMvc
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
@EnableAutoConfiguration(exclude = [ErrorMvcAutoConfiguration.class,
        WebSocketAutoConfiguration.class, JmxAutoConfiguration.class, GroovyTemplateAutoConfiguration.class])
public class Application extends SpringBootServletInitializer {

    private static final Logger logger = LoggerFactory.getLogger(Application.class)

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args)
    }

    @Bean
    public OnSuccessAdvice httpOkResponseAdvice() {
        new OnSuccessAdvice();
    }

    @Bean
    public FilterRegistrationBean characterEncodingFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(characterEncodingFilter());
        registration.addUrlPatterns("/*");
        registration.addInitParameter("encoding", "UTF-8");
        registration.addInitParameter("forceEncoding", "true");
        registration.setName("characterEncodingFilter");
        return registration;
    }

    @Bean(name = "characterEncodingFilter")
    public Filter characterEncodingFilter() {
        return new org.springframework.web.filter.CharacterEncodingFilter();
    }

}