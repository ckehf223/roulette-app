package com.spring.board.controller;


import com.spring.board.auth.dto.CustomUserDetails;
import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.MyListDto;
import com.spring.board.dto.ResultHisDto;
import com.spring.board.service.MyListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/myList")
public class MyListController {

    private final MyListService myListService;

    @GetMapping("/find")
    public ResponseEntity<List<CamelCaseMap>> findMyList(MyListDto myListDto){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        if(user != null){
            myListDto.setUserId(user.getUserId());
            return ResponseEntity.ok(myListService.findMyList(myListDto));
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Integer> save(@RequestBody MyListDto myListDto){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        if(user != null){
            myListDto.setUserId(user.getUserId());
            return ResponseEntity.ok(myListService.save(myListDto));
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

    }

}
