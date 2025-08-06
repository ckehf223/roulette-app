package com.spring.board.controller;

import com.spring.board.entity.Member;
import com.spring.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Member> create(@RequestBody Member member) {
        Member saved = memberService.save(member);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Member>> list() {
        return ResponseEntity.ok(memberService.findAll());
    }
}