package com.vnpt.quizz_education_be.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomRespone {
    private Integer status;
    private String statusMessage;
}
