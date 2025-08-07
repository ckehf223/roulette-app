package com.spring.board.service;

import com.spring.board.entity.Restaurant;
import com.spring.board.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public Restaurant save(Restaurant restaurant) {
        Restaurant res = null;
        switch(restaurant.getStatus()){
            case "C":
            case "U":
                res = restaurantRepository.save(restaurant);
                break;
            case "D":
                break;
        }
        return res;
    }

    public List<Restaurant> findAll() {
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> findById(Long id) {
        return restaurantRepository.findById(id);
    }

}
