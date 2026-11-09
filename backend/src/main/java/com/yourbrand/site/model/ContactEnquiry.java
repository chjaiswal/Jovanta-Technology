package com.yourbrand.site.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "contact_enquiries")
public class ContactEnquiry {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = false, length = 160)
    private String email;
    @Column(length = 30)
    private String phone;
    @Column(nullable = false, length = 3000)
    private String message;
    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    protected ContactEnquiry() {}
    public ContactEnquiry(String name, String email, String phone, String message) {
        this.name = name; this.email = email; this.phone = phone; this.message = message;
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getMessage() { return message; }
    public Instant getCreatedAt() { return createdAt; }
}
