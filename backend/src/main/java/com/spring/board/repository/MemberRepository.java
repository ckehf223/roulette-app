package com.spring.board.repository;

import com.spring.board.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
public interface MemberRepository extends JpaRepository<Member,Long> {
}
