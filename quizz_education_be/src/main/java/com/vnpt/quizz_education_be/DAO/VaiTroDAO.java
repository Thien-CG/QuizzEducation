package com.vnpt.quizz_education_be.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vnpt.quizz_education_be.Entity.VaiTro;

public interface VaiTroDAO extends JpaRepository<VaiTro, Integer> {
 VaiTro findByTenVaiTro(String tenVaiTro);
}
