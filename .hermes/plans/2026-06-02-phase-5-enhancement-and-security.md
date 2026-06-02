# Phase 5 — Platform Enhancement & Security

## Overview
Post-Phase 3 enhancements: reviews, pricing, messaging, maps, mobile, security hardening, and analytics.

## Workstreams

### 5.1 — Reviews & Ratings
- Auto-prompt customers to review after completed bookings
- Review management page (view/edit/delete reviews)
- Rating aggregation on mechanic profiles and search results
- Abuse prevention (one review per booking, content moderation)

### 5.2 — Service Pricing
- Replace fixed R100 placeholder with actual service pricing
- Provider sets rates for different service categories
- Quote/negotiation flow between customer and provider
- Payment amount reflects agreed price

### 5.3 — In-App Chat & Messaging
- Real-time messaging between customer and provider
- Message history tied to each booking
- Notifications for new messages
- Fallback to WhatsApp redirect for off-platform contact

### 5.4 — Vehicle Management
- Extended vehicle fields: VIN, year, mileage, service history
- Vehicle service records (track what was done, when, by whom)
- Multi-vehicle profiles linked to customer account

### 5.5 — Notifications (Multi-Channel)
- Email notifications for booking status changes
- SMS alerts for urgent updates (booking accepted, cancelled)
- Push notifications (PWA or mobile)
- Notification preferences page

### 5.6 — Maps & Geolocation
- Interactive map view for finding nearby mechanics
- Geocoding addresses to coordinates
- Distance-based search and filtering
- Provider service area definition

### 5.7 — Mobile & PWA
- Progressive Web App with offline support
- Push notification integration
- Touch-optimized UI improvements
- App-like install prompt

### 5.8 — Security Hardening
- Rate limiting on auth endpoints and API generally
- Input sanitization audit across all endpoints
- Two-factor authentication for provider/admin accounts
- API key management for third-party integrations
- Session management and token rotation

### 5.9 — Analytics & Reporting
- Platform-wide metrics dashboard
- Revenue reports (daily/weekly/monthly)
- Provider performance scoring
- Customer acquisition funnel analytics
- Export to CSV/PDF

---

*Saved: 2026-06-02. Draft — scope and ordering subject to discussion.*
