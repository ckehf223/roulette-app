package com.spring.board.service;

import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.MemberDto;
import com.spring.board.dto.RestaurantDto;
import com.spring.board.mapper.MemberMapper;
import com.spring.board.mapper.RestaurantMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {


    private final RestaurantMapper restaurantMapper;

    public Integer save(RestaurantDto restaurantDto) {
        Integer result = 0;
        switch(restaurantDto.getStatus()){
            case "C":
            case "U":
                result = restaurantMapper.insertRestaurant(restaurantDto);
                break;
            case "D":
                break;
            default:
                break;
        }
        return result;
    }

    public List<CamelCaseMap> findRestaurantList() {
        return restaurantMapper.findRestaurantList();
    }

}
