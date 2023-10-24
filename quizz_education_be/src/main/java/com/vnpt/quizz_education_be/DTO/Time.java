package com.vnpt.quizz_education_be.DTO;

import lombok.Data;

@Data
public class Time {
    long seconds;
    long minutes;
    long hours;

    public Time(long differenceInMillis) {
        long seconds = differenceInMillis / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;

        long remainingMinutes = minutes % 60;
        long remainingSeconds = seconds % 60;
        this.hours = hours;
        this.minutes = remainingMinutes;
        this.seconds = remainingSeconds;
    }
}
