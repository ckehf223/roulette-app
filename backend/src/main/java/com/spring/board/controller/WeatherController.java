package com.spring.board.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RestController
@Slf4j
@RequestMapping("/api/weather")
public class WeatherController {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${weather.api.secretkey}")
    private String secretKey;


    @GetMapping("/today")
    public ResponseEntity<String> getWeather(@RequestParam String nx, @RequestParam String ny, HttpServletRequest request) throws URISyntaxException {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        String baseDate = today.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String hours = now.format(DateTimeFormatter.ofPattern("HH"));
        String minute = now.format(DateTimeFormatter.ofPattern("mm"));

        String baseTime = "";
        if(Integer.parseInt(minute) >= 45){
            baseTime = hours + "30";
        }else{
            hours = String.valueOf(Integer.parseInt(hours) -1);
            baseTime = hours + "30";
        }

        String url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"
                + "?serviceKey=" + secretKey
                + "&pageNo=1"
                + "&numOfRows=1000"
                + "&dataType=JSON"
                + "&base_date=" + baseDate
                + "&base_time=" + baseTime
                + "&nx=" + nx
                + "&ny=" + ny
                ;

        URI uri = new URI(url);
        String response = restTemplate.getForObject(uri, String.class);

        return ResponseEntity.ok(response);
    }

}
