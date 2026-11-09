package com.yourbrand.site.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "quote_requests")
public class QuoteRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = false, length = 160)
    private String email;
    @Column(length = 30)
    private String phone;
    @Column(length = 150)
    private String businessName;
    @Column(nullable = false, length = 120)
    private String serviceType;
    @Column(length = 80)
    private String budget;
    @Column(nullable = false, length = 4000)
    private String description;
    @Column(nullable = false, length = 30)
    private String status = "NEW";
    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    protected QuoteRequest() {}
    public QuoteRequest(String name, String email, String phone, String businessName,
                        String serviceType, String budget, String description) {
        this.name = name; this.email = email; this.phone = phone;
        this.businessName = businessName; this.serviceType = serviceType;
        this.budget = budget; this.description = description;
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getBusinessName() { return businessName; }
    public String getServiceType() { return serviceType; }
    public String getBudget() { return budget; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
}
