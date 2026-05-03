# Project: Personal Expense Tracker (PWA)

## Overview

This is a personal-use expense tracker application (not multi-user SaaS).
The goal is speed, simplicity, and cross-device sync.

The UI is already designed and available inside the `/ui` folder.
Your job is to implement the full-stack app using this UI.

---

## Tech Stack (STRICT)

* Framework: Next.js (App Router)
* Language: TypeScript
* Styling: Tailwind CSS + shadcn/ui
* Backend: Next.js Server Actions / API routes
* Database: Supabase (PostgreSQL)
* Auth: Supabase Auth (email or Google)
* Deployment: Vercel
* State: React hooks (avoid overengineering)

---

## Core Features

1. Authentication (Supabase)
2. Expense & Income tracking
3. Categories (predefined + optional custom)
4. Dashboard (balance, recent transactions, summary)
5. Transactions list (filter, edit, delete)
6. Insights (basic charts)
7. Real-time sync using Supabase
8. Offline support (basic caching for PWA)

---

## Database Schema (Follow this strictly)

### users (managed by Supabase)

### transactions

* id (uuid, primary key)
* user_id (uuid, foreign key)
* amount (number)
* type (income | expense)
* category (string)
* note (text)
* created_at (timestamp)

---

## Rules

* Keep code simple and readable
* Do NOT add unnecessary abstractions
* Do NOT create microservices or separate backend
* Follow folder structure properly
* Use environment variables for Supabase keys
* Validate inputs properly
* Handle loading and error states in UI

---

## Folder Structure

/app
/dashboard
/transactions
/settings
/api
/components
/lib
supabaseClient.ts
/ui (provided UI - must be reused, not rewritten)

---

## Implementation Guidelines

* Reuse UI components from `/ui`
* Connect UI to real data (no mock data)
* Use server actions for mutations
* Use Supabase client for queries
* Ensure mobile responsiveness
* Add basic PWA support

---

## Goal

A clean, working personal app that:

* Syncs across devices
* Works offline (basic)
* Is fast and minimal
