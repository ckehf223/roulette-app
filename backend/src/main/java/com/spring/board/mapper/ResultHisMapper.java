package com.spring.board.mapper;

import com.spring.board.dto.ResultHisDto;

import java.util.List;

public interface ResultHisMapper {

    List<ResultHisDto> findResultHisList(ResultHisDto resultHisDto);

    Integer insertResultHis(ResultHisDto resultHisDto);
}
