package com.spring.board.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class WeatherService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${weather.api.secretkey}")
    private String secretKey;

    @Cacheable(value = "weatherCache", key = "#nx + ':' + #ny")
    public String getWeather(@RequestParam String nx, @RequestParam String ny) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        String baseDate = today.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String hours = now.format(DateTimeFormatter.ofPattern("HH"));
        String minute = now.format(DateTimeFormatter.ofPattern("mm"));
        String baseTime = (Integer.parseInt(minute) >= 45)
                ? hours + "30"
                : (Integer.parseInt(hours) - 1) + "30";

        try {
            String url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"
                    + "?serviceKey=" + secretKey
                    + "&pageNo=1"
                    + "&numOfRows=1000"
                    + "&dataType=JSON"
                    + "&base_date=" + baseDate
                    + "&base_time=" + baseTime
                    + "&nx=" + nx
                    + "&ny=" + ny;

            URI uri = new URI(url);
            return restTemplate.getForObject(uri, String.class); // ✅ String만 캐시

        } catch (Exception e) {
            log.error("날씨 API 호출 실패", e);
            return "{\"status\": \"fail\", \"message\": \"현재 날씨 API 점검 중입니다.\"}";
        }
    }
}
