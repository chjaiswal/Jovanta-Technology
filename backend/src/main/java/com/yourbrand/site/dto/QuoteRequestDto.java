package com.yourbrand.site.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record QuoteRequestDto(
    @NotBlank @Size(max = 100) String name,
    @NotBlank @Email @Size(max = 160) String email,
    @Size(max = 30) String phone,
    @Size(max = 150) String businessName,
    @NotBlank @Size(max = 120) String serviceType,
    @Size(max = 80) String budget,
    @NotBlank @Size(max = 4000) String description
) {}
