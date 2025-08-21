package com.spring.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestaurantDto {

    private Long id;
    private String name;
    private String linkUrl;
    private String remark;
    private String status;
}
