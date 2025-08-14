package com.spring.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultHisDto {

    private Long id;
    private Long userId;
    private String result;
    private String reqDate;

    private String baseDate;
}
