package com.yourbrand.site.controller;

import com.yourbrand.site.dto.ContactRequest;
import com.yourbrand.site.dto.QuoteRequestDto;
import com.yourbrand.site.model.ContactEnquiry;
import com.yourbrand.site.model.QuoteRequest;
import com.yourbrand.site.repository.ContactEnquiryRepository;
import com.yourbrand.site.repository.QuoteRequestRepository;
import com.yourbrand.site.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class EnquiryController {
    private final ContactEnquiryRepository contacts;
    private final QuoteRequestRepository quotes;
    private final NotificationService notifications;

    public EnquiryController(ContactEnquiryRepository contacts, QuoteRequestRepository quotes,
                             NotificationService notifications) {
        this.contacts = contacts; this.quotes = quotes; this.notifications = notifications;
    }

    @PostMapping("/contact")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> contact(@Valid @RequestBody ContactRequest request) {
        ContactEnquiry saved = contacts.save(new ContactEnquiry(
                request.name().trim(), request.email().trim(), clean(request.phone()), request.message().trim()));
        notifications.notify("New website contact enquiry",
                "Name: " + saved.getName() + "\nEmail: " + saved.getEmail()
                + "\nPhone: " + saved.getPhone() + "\nMessage: " + saved.getMessage());
        return Map.of("message", "Thank you! Your message has been received.");
    }

    @PostMapping("/quotes")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> quote(@Valid @RequestBody QuoteRequestDto request) {
        QuoteRequest saved = quotes.save(new QuoteRequest(
                request.name().trim(), request.email().trim(), clean(request.phone()),
                clean(request.businessName()), request.serviceType().trim(), clean(request.budget()),
                request.description().trim()));
        notifications.notify("New website quote request",
                "Name: " + saved.getName() + "\nEmail: " + saved.getEmail()
                + "\nPhone: " + saved.getPhone() + "\nBusiness: " + saved.getBusinessName()
                + "\nService: " + saved.getServiceType() + "\nBudget: " + saved.getBudget()
                + "\nDescription: " + saved.getDescription());
        return Map.of("message", "Thanks! Your project request has been received.");
    }

    private String clean(String value) { return value == null ? null : value.trim(); }
}
