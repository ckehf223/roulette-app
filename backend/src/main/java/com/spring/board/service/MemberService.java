package com.spring.board.service;

import com.spring.board.dto.MemberDto;
import com.spring.board.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

    public Integer checkId(String username) {
        return memberMapper.checkId(username);
    }

    public Integer checkEmail(String email) {
        return memberMapper.checkEmail(email);
    }

    public Integer joinMember(MemberDto memberDto) {
        memberDto.setPassword(passwordEncoder.encode(memberDto.getPassword()));
        return memberMapper.insertMember(memberDto);
    }

}
