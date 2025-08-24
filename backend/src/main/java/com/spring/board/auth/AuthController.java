package com.spring.board.auth;

import com.spring.board.auth.dto.CustomUserDetails;
import com.spring.board.auth.dto.LoginRequest;
import com.spring.board.auth.jwt.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

        String accessToken = jwtUtil.createAccessToken(user.getUserId(),user.getUsername(), user.getAuthorities().iterator().next().getAuthority());
        String refreshToken = jwtUtil.createRefreshToken(user.getUsername());

        // RefreshToken은 HttpOnly 쿠키에 저장
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(Map.of("accessToken", accessToken));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@CookieValue("refreshToken") String refreshToken) {
        if (jwtUtil.validateToken(refreshToken) && "refresh".equals(jwtUtil.getType(refreshToken))) {
            Long userId = jwtUtil.getUserId(refreshToken);
            String username = jwtUtil.getUsername(refreshToken);
            String newAccessToken = jwtUtil.createAccessToken(userId,username, "ROLE_USER"); // DB에서 권한 조회 가능
            return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}