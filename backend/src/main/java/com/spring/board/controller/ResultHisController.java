package com.spring.board.controller;


import com.spring.board.auth.dto.CustomUserDetails;
import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.ResultHisDto;
import com.spring.board.service.ResultHisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/result/his")
public class ResultHisController {

    private final ResultHisService resultService;

    @GetMapping("/find")
    public ResponseEntity<List<CamelCaseMap>> findResultHisList(ResultHisDto resultHisDto){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        if(user != null && "USER".equals(user.getRole())){
            resultHisDto.setUserId(user.getUserId());
        }
        return ResponseEntity.ok(resultService.findResultHisList(resultHisDto));
    }

    @PostMapping("/save")
    public ResponseEntity<Integer> insertResultHis(@RequestBody ResultHisDto resultHisDto){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails user) {
            // 로그인 되어있으면 토큰에서 꺼낸 userId 사용
            resultHisDto.setUserId(user.getUserId());
        } else {
            // 로그인 안 되어있으면 기본값
            resultHisDto.setUserId(1L);
        }
        return ResponseEntity.ok(resultService.insertResultHis(resultHisDto));
    }

}
