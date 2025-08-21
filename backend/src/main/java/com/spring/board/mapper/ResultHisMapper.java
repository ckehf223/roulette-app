package com.spring.board.mapper;

import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.ResultHisDto;

import java.util.List;

public interface ResultHisMapper {

    List<CamelCaseMap> findResultHisList(ResultHisDto resultHisDto);

    Integer insertResultHis(ResultHisDto resultHisDto);
}
