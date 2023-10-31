package com.vnpt.quizz_education_be.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailDTO {
    private String from;
    private String to; // Địa chỉ email người nhận
    private String subject; // Chủ đề của email
    private String text; // Nội dung email

    public EmailDTO(String to, String subject, String text) {
        this.from = "Quizz Education <quizzeducation@tpl.edu.vn>";
        this.to = to;
        this.subject = subject;
        this.text = text;
    }
}
