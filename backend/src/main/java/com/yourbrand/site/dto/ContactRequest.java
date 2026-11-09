package com.yourbrand.site.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
    @NotBlank @Size(max = 100) String name,
    @NotBlank @Email @Size(max = 160) String email,
    @Size(max = 30) String phone,
    @NotBlank @Size(max = 3000) String message
) {}
