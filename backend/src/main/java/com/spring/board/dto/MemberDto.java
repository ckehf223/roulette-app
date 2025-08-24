package com.spring.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberDto {
    private Long id;
    private String username;
    private String password;
    private String email;
    private String remark;
    private String role;

}
