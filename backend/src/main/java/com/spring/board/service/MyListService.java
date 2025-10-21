package com.spring.board.service;

import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.MyListDto;
import com.spring.board.dto.RestaurantDto;
import com.spring.board.dto.ResultHisDto;
import com.spring.board.mapper.MyListMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyListService {

    private final MyListMapper myListMapper;

    @Cacheable(value = "myRestaurantList", key = "#myListDto.userId")
    public List<CamelCaseMap> findMyList(MyListDto myListDto) {
        return myListMapper.findMyList(myListDto);
    }

    @CacheEvict(value = "myRestaurantList", key = "#myListDto.userId")
    public Integer save(MyListDto myListDto) {
        Integer result = 0;
        switch(myListDto.getStatus()){
            case "C":
                result = myListMapper.insertMyList(myListDto);
                break;
            case "U":
                result = myListMapper.updateMyList(myListDto);
                break;
            case "D":
                result = myListMapper.deleteMyList(myListDto);
                break;
            default:
                break;
        }
        return result;
    }

}
