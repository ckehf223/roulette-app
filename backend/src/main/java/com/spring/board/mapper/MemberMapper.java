package com.spring.board.mapper;

import com.spring.board.dto.MemberDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MemberMapper {
    MemberDto findByUsername(String username);

    List<MemberDto> findAll();

    int insertMember(MemberDto memberDto);

    int updatePasswordEncode(MemberDto memberDto);

    int checkId(@Param("username") String username);

    int checkEmail(@Param("email") String email);
}
