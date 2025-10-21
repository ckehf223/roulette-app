package com.spring.board.auth.mail;

import com.spring.board.auth.AuthService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/email")
@RequiredArgsConstructor
public class EmailAuthController {

    private final AuthService authService;

    // 인증번호 발송
    @PostMapping("/send")
    public ResponseEntity<String> sendCode(@RequestBody Map<String, String> request) throws MessagingException {
        String email = request.get("email");
        authService.sendVerificationCode(email);
        return ResponseEntity.ok("인증번호가 이메일로 발송되었습니다.");
    }

    // 인증번호 검증
    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        boolean result = authService.confirmCode(email, code);

        Map<String, Object> response = new HashMap<>();
        response.put("success", result);

        if (!result) {
            response.put("message", "인증번호가 만료되었거나 올바르지 않습니다.");
        }

        return ResponseEntity.ok(response);
    }
}
