package com.spring.board.auth.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {
//    private final StringRedisTemplate redisTemplate;
//
//    // 인증번호 저장
//    public void saveCode(String email, String code) {
//        redisTemplate.opsForValue().set(email, code, Duration.ofMinutes(5));
//    }
//
//    // 인증번호 검증
//    public boolean verifyCode(String email, String code) {
//        String savedCode = redisTemplate.opsForValue().get(email);
//        if (savedCode != null && savedCode.equals(code)) {
//            redisTemplate.delete(email); // 성공 시 삭제
//            return true;
//        }
//        return false;
//    }
}