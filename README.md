
# Mutara Farm Management System

A comprehensive farm management system built with React, TypeScript, and Supabase.

## Setting Up Supabase

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Once your project is created, go to the SQL Editor in the Supabase dashboard
3. Copy the contents of `src/db/schema.sql` and paste it into the SQL Editor
4. Run the SQL script to create all necessary tables and populate them with sample data
5. Get your Supabase URL and anon key from the API settings page
6. Create a `.env.local` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Setting Up Row Level Security (RLS)

The SQL script includes Row Level Security policies that:
- Allow authenticated users to read all data
- Allow authenticated users to insert, update, and delete their own data

If you need more sophisticated policies, you can modify them in the Supabase dashboard.

## Database Schema

The application uses the following tables:

- `livestock`: Stores information about each animal
- `health_records`: Medical records for livestock
- `vaccination_schedules`: Upcoming vaccination appointments
- `feeding_schedules`: Feeding routines
- `feed_inventory`: Available feed supplies
- `tasks`: Farm tasks and to-dos
- `financial_transactions`: Income and expenses

## Development

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Access the application at `http://localhost:5173`

## Authentication

The application uses Supabase Authentication. Users can:
- Register with email and password
- Log in with email and password
- Reset password

To access the application, users must be authenticated.
