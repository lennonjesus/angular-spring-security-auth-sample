package com.lennonjesus.auth.rest

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

/**
 * @author Lennon Jesus
 */
@RestController
class HelloController {

    @RequestMapping("/hello")
    def @ResponseBody String hello() {
        "Hello, authenticated user."
    }

}
