# MoneyTrack

Personal Expense Tracker PWA built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Dashboard:** Overview of balance, income, and expenses.
- **Transactions:** Searchable list of all activities grouped by date.
- **Quick Add:** Efficient numeric keypad for logging transactions.
- **Insights:** Spending trends and category analysis.
- **Authentication:** Secure login/signup via Supabase Auth.
- **PWA:** Installable on mobile with offline support.

## Setup Instructions

### 1. Supabase Project
1. Create a new project on [Supabase](https://supabase.com/).
2. Go to the SQL Editor and run the contents of `supabase/schema.sql`.
3. Copy your Project URL and Anon Key.

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Installation
```bash
npm install
```

### 4. Running the App
```bash
npm run dev
```

## Tech Stack
- **Framework:** Next.js (App Router)
- **Database/Auth:** Supabase
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Material Symbols Outlined
