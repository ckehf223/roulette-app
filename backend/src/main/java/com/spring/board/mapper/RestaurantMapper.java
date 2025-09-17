package com.spring.board.mapper;

import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.RestaurantDto;

import java.util.List;

public interface RestaurantMapper {

    List<CamelCaseMap> findRestaurantList();

    Integer insertRestaurant(RestaurantDto restaurantDto);

    Integer updateRestaurant(RestaurantDto restaurantDto);

    Integer deleteRestaurant(RestaurantDto restaurantDto);
}
