package com.spring.board.controller;

import com.spring.board.service.WeatherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping("/today")
    public ResponseEntity<?> getWeather(@RequestParam String nx, @RequestParam String ny) {
        String data = weatherService.getWeather(nx, ny);
        return ResponseEntity.ok(data);

    }

}
