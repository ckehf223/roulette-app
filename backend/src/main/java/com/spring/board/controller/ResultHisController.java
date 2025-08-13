package com.spring.board.controller;


import com.spring.board.dto.ResultHisDto;
import com.spring.board.service.ResultHisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/result/his")
public class ResultHisController {

    private final ResultHisService resultService;

    @GetMapping("/find")
    public ResponseEntity<List<ResultHisDto>> findResultHisList(ResultHisDto resultHisDto){
        return ResponseEntity.ok(resultService.findResultHisList(resultHisDto));
    }

    @PostMapping("/save")
    public ResponseEntity<Integer> insertResultHis(ResultHisDto resultHisDto){
        return ResponseEntity.ok(resultService.insertResultHis(resultHisDto));
    }

}
