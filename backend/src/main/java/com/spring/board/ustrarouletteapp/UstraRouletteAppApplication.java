package com.spring.board.ustrarouletteapp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@MapperScan("com.spring.board.mapper")
@EnableJpaRepositories(basePackages = "com.spring.board.repository")
@EntityScan(basePackages = "com.spring.board.entity")
@SpringBootApplication(scanBasePackages = "com.spring")
public class UstraRouletteAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(UstraRouletteAppApplication.class, args);
    }

}
