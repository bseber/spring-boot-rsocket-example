package com.example.demo;

import org.springframework.messaging.rsocket.annotation.ConnectMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
class HelloWsController {

    @ConnectMapping
    public Mono<Void> connect() {
        System.out.println("@ConnectMapping succeeded");
        return Mono.empty();
    }
}
