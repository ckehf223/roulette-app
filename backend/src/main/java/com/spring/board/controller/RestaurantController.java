package com.spring.board.controller;

import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.RestaurantDto;
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

    @GetMapping("/find")
    public ResponseEntity<List<CamelCaseMap>>  findRestaurantList() {
        return ResponseEntity.ok(restaurantService.findRestaurantList());
    }

    @PostMapping
    public ResponseEntity<Integer> create(@RequestBody RestaurantDto restaurantDto) {
        return ResponseEntity.ok(restaurantService.save(restaurantDto));
    }

//    @PostMapping
//    public ResponseEntity<Restaurant> create(@RequestBody Restaurant restaurant) {
//        Restaurant saved = restaurantService.save(restaurant);
//        return ResponseEntity.ok(saved);
//    }
//
//    @GetMapping("/find")
//    public ResponseEntity<List<Restaurant>>  list() {
//        return ResponseEntity.ok(restaurantService.findAll());
//    }


}