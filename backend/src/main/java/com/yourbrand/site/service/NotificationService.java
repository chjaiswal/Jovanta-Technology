package com.yourbrand.site.service;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class NotificationService {
    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    @Value("${app.mail.from:}") private String from;
    @Value("${app.mail.notification-to:}") private String notificationTo;

    public NotificationService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    public void notify(String subject, String body) {
        if (!StringUtils.hasText(from) || !StringUtils.hasText(notificationTo)) return;
        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) return;
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(notificationTo);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch (Exception ex) {
            // Persisted enquiry remains successful even if optional email delivery fails.
        }
    }
}
