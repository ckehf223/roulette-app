package com.spring.board.mapper;

import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.MyListDto;
import com.spring.board.dto.ResultHisDto;

import java.util.List;

public interface MyListMapper {

    List<CamelCaseMap> findMyList(MyListDto myListDto);

    Integer insertMyList(MyListDto myListDto);

    Integer updateMyList(MyListDto myListDto);

    Integer deleteMyList(MyListDto myListDto);
}
