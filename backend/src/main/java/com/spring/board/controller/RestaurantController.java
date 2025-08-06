package com.spring.board.controller;

import com.spring.board.entity.Restaurant;
import com.spring.board.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/res")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Restaurant> create(@RequestBody Restaurant restaurant) {
        Restaurant saved = restaurantService.save(restaurant);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/find")
    public ResponseEntity<List<Restaurant>>  list() {
        return ResponseEntity.ok(restaurantService.findAll());
    }
}