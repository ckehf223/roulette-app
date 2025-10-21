package com.spring.board.service;

import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.ResultHisDto;
import com.spring.board.mapper.ResultHisMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultHisService {

    private final ResultHisMapper resultHisMapper;

    @Cacheable(value = "restaurantHisList", key = "#resultHisDto.userId")
    public List<CamelCaseMap> findResultHisList(ResultHisDto resultHisDto) {
        return resultHisMapper.findResultHisList(resultHisDto);
    }

    @CacheEvict(value = "restaurantHisList", key = "#resultHisDto.userId")
    public Integer insertResultHis(ResultHisDto resultHisDto) {
        return resultHisMapper.insertResultHis(resultHisDto);
    }
}
