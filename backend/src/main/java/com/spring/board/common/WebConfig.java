package com.spring.board.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173",            // 개발용
                        "https://ustralunchroulette.netlify.app",   // netlify url
                        "https://api.urroulette.com"                // API
                )
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}
