package com.vnpt.quizz_education_be.Util;

import java.util.Random;

public class OtpGenerator {

    public static String generateOtp() {
        int otpLength = 4; // Độ dài của mã OTP
        Random random = new Random();

        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10)); // Thêm một số ngẫu nhiên từ 0 đến 9 vào mã OTP
        }

        return otp.toString();
    }

    public static void main(String[] args) {
        String otp = generateOtp();
        System.out.println("Mã OTP mới: " + otp);
    }
}

