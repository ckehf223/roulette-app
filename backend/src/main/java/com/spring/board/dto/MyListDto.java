package com.spring.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyListDto {
    private Long id;
    private Long userId;
    private Long resId;
    private String name;
    private String linkUrl;
    private String remark;
    private String status;
}
