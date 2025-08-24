package com.spring.board.service;

import com.spring.board.auth.dto.CustomUserDetails;
import com.spring.board.core.CamelCaseMap;
import com.spring.board.mapper.ResultHisMapper;
import com.spring.board.dto.ResultHisDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultHisService {

    private final ResultHisMapper resultHisMapper;

    public List<CamelCaseMap> findResultHisList(ResultHisDto resultHisDto) {
        return resultHisMapper.findResultHisList(resultHisDto);
    }

    public Integer insertResultHis(ResultHisDto resultHisDto) {
        return resultHisMapper.insertResultHis(resultHisDto);
    }
}
