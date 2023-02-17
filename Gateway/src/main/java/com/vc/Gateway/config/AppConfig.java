package com.vc.Gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder){
        return builder.routes()
                .route(p-> p.path("/authentication/**")
                        .uri("http://localhost:8081"))
                .route(p-> p.path("/userdetails/**")
                        .uri("http://localhost:8082"))
                .build();
    }
}
