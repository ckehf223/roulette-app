package com.spring.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultHisDto {

    private Long id;
    private Long userId;
    private Long resId;
    private String resultName;
    private String reqDate;

    private String baseDate;
}
