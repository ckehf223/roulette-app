package com.spring.board.auth.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    public void sendVerificationCode(String toEmail, String code) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("Roulette 인증번호 안내");

        String htmlContent = "<div style='font-family:sans-serif; padding:20px;'>"
                + "<h2>이메일 인증번호</h2>"
                + "<p>아래 인증번호를 입력해주세요.</p>"
                + "<h3 style='color:#2F80ED;'>" + code + "</h3>"
                + "<p>인증번호는 <b>5분간 유효</b>합니다.</p>"
                + "</div>";

        helper.setText(htmlContent, true);

        mailSender.send(message);
    }
}