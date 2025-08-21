package com.spring.board.controller;


import com.spring.board.core.CamelCaseMap;
import com.spring.board.dto.ResultHisDto;
import com.spring.board.service.ResultHisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/result/his")
public class ResultHisController {

    private final ResultHisService resultService;

    @GetMapping("/find")
    public ResponseEntity<List<CamelCaseMap>> findResultHisList(ResultHisDto resultHisDto){
        return ResponseEntity.ok(resultService.findResultHisList(resultHisDto));
    }

    @PostMapping("/save")
    public ResponseEntity<Integer> insertResultHis(@RequestBody ResultHisDto resultHisDto){
        return ResponseEntity.ok(resultService.insertResultHis(resultHisDto));
    }

}
