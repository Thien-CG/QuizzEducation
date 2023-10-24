package com.vnpt.quizz_education_be.DTO;

public class EmailDTO {
    private String to; // Địa chỉ email người nhận
    private String subject; // Chủ đề của email
    private String text; // Nội dung email

    // Các phương thức getter và setter

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
