package com.sebastianriedel.lifechievement.task.dto;

public record TaskResponseDTO(Long id, String description, int points, int done, boolean status, boolean archived,
                              boolean repeatable) {

}
