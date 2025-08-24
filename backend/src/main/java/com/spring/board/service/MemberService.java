package com.spring.board.service;

import com.spring.board.dto.MemberDto;
import com.spring.board.entity.Member;
import com.spring.board.mapper.MemberMapper;
import com.spring.board.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

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
