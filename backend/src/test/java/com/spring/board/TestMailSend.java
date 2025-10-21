package com.spring.board;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@SpringBootTest
public class TestMailSend {

    @Autowired
    private JavaMailSender mailSender;

    @Test
    void testMail() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("ckehf223@naver.com");
        message.setSubject("메일 테스트");
        message.setText("SMTP 테스트입니다.");
        mailSender.send(message);
        System.out.println("✅ 메일 전송 성공!");
    }
}