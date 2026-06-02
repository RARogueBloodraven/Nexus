# Nexus Project Structure Documentation

## Overview
Nexus is a role-based collaboration platform connecting Investors and Entrepreneurs.

---

## src/components
Contains reusable UI components:
- Chat components (messages, user list)
- Collaboration cards
- Investor & Entrepreneur cards
- Shared UI elements (Button, Card, Input, Badge, Avatar)

---

## src/layout
Defines main application layout:
- DashboardLayout: wraps all dashboard pages
- Navbar: top navigation bar
- Sidebar: main navigation menu

---

## src/ui
Reusable UI system components:
- Button
- Card
- Input
- Badge
- Avatar

Ensures consistent design across application.

---

## src/context
- AuthContext: handles user authentication and session state

---

## src/data
Mock data used for development:
- users
- messages
- collaboration requests

---

## src/pages
All application screens:

### Authentication
- LoginPage
- RegisterPage
- ForgotPasswordPage
- ResetPasswordPage

### Dashboard
- InvestorDashboard
- EntrepreneurDashboard

### Features
- ChatPage
- DealsPage
- DocumentsPage
- MessagesPage
- NotificationsPage

### Profiles
- InvestorProfile
- EntrepreneurProfile

### Others
- SettingsPage
- HelpPage
- InvestorsPage
- EntrepreneursPage

---

## App.tsx
Main routing file connecting all pages.

---

## Summary
The project uses a modular React architecture with:
- reusable components
- role-based dashboards
- centralized authentication system
- modular feature-based pages