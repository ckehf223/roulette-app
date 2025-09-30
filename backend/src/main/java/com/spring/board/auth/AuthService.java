package com.spring.board.auth;

import com.spring.board.auth.mail.EmailVerificationService;
import com.spring.board.auth.mail.MailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

//    private final EmailVerificationService verificationService;
//    private final MailService mailService;
//
//    // 인증번호 발송
//    public void sendVerificationCode(String email) throws MessagingException {
//        String code = String.valueOf((int) (Math.random() * 900000) + 100000); // 6자리
//
//        // Redis에 저장 (5분 TTL)
//        verificationService.saveCode(email, code);
//
//        // 이메일 발송
//        mailService.sendVerificationCode(email, code);
//    }
//
//    // 인증번호 검증
//    public boolean confirmCode(String email, String code) {
//        return verificationService.verifyCode(email, code);
//    }
}