package com.yourbrand.site.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CatalogController {
    @GetMapping("/health")
    public Map<String, String> health() { return Map.of("status", "UP"); }

    @GetMapping("/services")
    public List<Map<String, String>> services() {
        return List.of(
            item("E-commerce Development", "Online stores, product catalogues, payment gateway and shipping integrations.", "shopping-bag"),
            item("Custom Web Applications", "Business dashboards, admin panels, workflow tools and reporting systems.", "layout-dashboard"),
            item("Backend & API Development", "Secure REST APIs, Java/Spring Boot services, database design and integrations.", "code"),
            item("AI Integration & Automation", "LLM-powered features, chat assistants and practical workflow automation.", "sparkles"),
            item("Business Websites", "Responsive company websites, landing pages and website redesigns.", "monitor"),
            item("Cloud Deployment & Maintenance", "Docker deployment, VPS setup, SSL configuration and ongoing support.", "cloud")
        );
    }

    @GetMapping("/projects")
    public List<Map<String, String>> projects() {
        return List.of(
            Map.of("title", "E-commerce Platform", "category", "E-commerce", "description", "A sample online-store concept with catalogue, checkout and order workflows.", "stack", "React · Spring Boot · PostgreSQL"),
            Map.of("title", "Business Reporting Portal", "category", "Web Application", "description", "A sample dashboard concept for managing reports, data mappings and business workflows.", "stack", "React · Java · PostgreSQL"),
            Map.of("title", "AI-enabled Business Assistant", "category", "AI Integration", "description", "A concept for adding conversational assistance and automation to business applications.", "stack", "Spring Boot · LLM APIs")
        );
    }

    private Map<String, String> item(String title, String description, String icon) {
        return Map.of("title", title, "description", description, "icon", icon);
    }
}
