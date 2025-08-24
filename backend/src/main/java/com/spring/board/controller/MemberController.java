package com.spring.board.controller;

import com.spring.board.dto.MemberDto;
import com.spring.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/checkId")
    public ResponseEntity<Integer> checkId(@RequestParam("id") String username) {
        return ResponseEntity.ok(memberService.checkId(username));
    }

    @GetMapping("/checkEmail")
    public ResponseEntity<Integer> checkEmail(@RequestParam("email") String email) {
        return ResponseEntity.ok(memberService.checkEmail(email));
    }

    @PostMapping("/join")
    public ResponseEntity<Integer> checkEmail(@RequestBody MemberDto memberDto) {
        return ResponseEntity.ok(memberService.joinMember(memberDto));
    }

}