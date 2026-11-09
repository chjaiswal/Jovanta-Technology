# Software Services Website (Editable Brand Starter)

A responsive software-development business website built with React + Vite + Tailwind CSS, Java 21 + Spring Boot, PostgreSQL, Docker Compose, and Nginx.

The starter brand is **YourBrand**. Change it in `frontend/src/config/brand.js` and update the README/contact details before publishing.

## Included
- Home page with hero, service cards, process, featured work, and contact CTA
- Services, About, Work, and Contact sections with responsive navigation
- Contact and quote request forms
- Spring Boot REST APIs with validation and PostgreSQL persistence
- Optional SMTP email notifications (the forms still save when SMTP is not configured)
- Dockerfiles, Docker Compose, and Nginx reverse proxy
- Environment-variable based configuration

## Requirements
- Docker Engine + Docker Compose plugin (recommended), OR
- Node.js 20+; Java 21; Maven 3.9+; PostgreSQL 16+

## Run with Docker (recommended)
1. Copy environment template:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env`. At minimum, change `POSTGRES_PASSWORD` to a strong password.
3. Start:
   ```bash
   docker compose up --build -d
   ```
4. Open `http://localhost:8080`.
5. Check backend health at `http://localhost:8080/api/health`.

Stop:
```bash
docker compose down
```
Stop and delete the local database volume (destructive):
```bash
docker compose down -v
```

## Run locally without Docker

### Backend
1. Create a PostgreSQL database and user, or use your own existing database.
2. Set environment variables (example):
   ```bash
   export DB_URL='jdbc:postgresql://localhost:5432/services_site'
   export DB_USERNAME='services_user'
   export DB_PASSWORD='change_me'
   ```
3. Run:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   If you don't have the Maven wrapper, use `mvn spring-boot:run`.

Backend runs on `http://localhost:8081`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in terminal (normally `http://localhost:5173`). The Vite dev server proxies `/api` to `http://localhost:8081`.

## API endpoints
- `GET /api/health` — health check
- `GET /api/services` — service catalogue
- `GET /api/projects` — sample project catalogue
- `POST /api/contact` — save a contact enquiry
- `POST /api/quotes` — save a quote request

Example contact payload:
```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "phone": "+91 9876543210",
  "message": "I need a business website."
}
```

Example quote payload:
```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "phone": "+91 9876543210",
  "businessName": "Aarav Retail",
  "serviceType": "E-commerce development",
  "budget": "₹25,000–₹50,000",
  "description": "I need an online store with payment and shipping integration."
}
```

## Customise the brand and content
- Brand name, tagline, email, phone, WhatsApp: `frontend/src/config/brand.js`
- Services and portfolio cards: `frontend/src/data/content.js`
- Main styles: `frontend/src/index.css`
- Backend service/project catalogue: `backend/src/main/java/com/yourbrand/site/controller/CatalogController.java`

Replace all sample project descriptions and contact details with accurate information. Do not publish confidential employer/customer data or screenshots without permission.

## SMTP email notifications (optional)
Set these in `.env`:
- `MAIL_HOST`
- `MAIL_PORT` (usually 587)
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `MAIL_FROM`
- `NOTIFICATION_TO`

When configured, the backend sends a notification after saving a form. For production, use an email provider's SMTP credentials or transactional email service. Do not commit credentials.

## Production deployment checklist
1. Point your domain's DNS A record to your VPS public IP.
2. Change `.env` passwords and set `CORS_ALLOWED_ORIGINS` to your real website origin.
3. Configure a firewall to allow only SSH, HTTP (80), and HTTPS (443). Do not expose PostgreSQL publicly.
4. For HTTPS, use a trusted certificate (for example, Let's Encrypt) and configure Nginx TLS termination. The included Nginx config serves HTTP only as a starter.
5. Add automated PostgreSQL backups and test restoring them.
6. Configure monitoring, log rotation, SMTP, rate limiting, and spam protection before launch.
7. Run dependency/security updates and review privacy/legal requirements.

## Important security notes
This is a starter project, not a fully audited production system. It intentionally does not include a public admin dashboard. Add authentication and role-based authorization before exposing enquiry-management endpoints. Add rate limiting/CAPTCHA and privacy consent as appropriate. Never store secrets in Git.
