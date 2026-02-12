package com.sebastianriedel.lifechievement.ExceptionHandling;

public class ErrorResponseDTO {

    private String error;
    private String message;

    public ErrorResponseDTO(String error, String message) {
        this.error = error;
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }
}
