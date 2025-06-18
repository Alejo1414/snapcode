# Snapcode PRD

## 🧠 Overview

Snapcode is a developer tool that converts UI screenshots into production-ready HTML and Tailwind CSS code using AI (OpenAI Vision).  
It removes the friction of manual slicing and speeds up front-end prototyping by turning designs into code in seconds.

## 🎯 Goals

- Let users upload a screenshot (via drag & drop or file picker)
- Generate HTML + Tailwind CSS using OpenAI's Vision model
- Offer a clean, developer-friendly interface
- Provide a freemium tier (3–5 free conversions), with paid plans after that
- No setup required (no user API keys)

## ✨ Core Features (MVP)

- Image upload (drag and drop + file picker)
- AI processing via backend call to OpenAI Vision API
- Display generated code (HTML + Tailwind) in a code viewer
- Copy-to-clipboard buttons
- Download ZIP of generated code
- Auth (email + Google login)
- Stripe integration for payment and pro plan gating

## 🔒 Future Features (Post-MVP)

- Bulk screenshot processing
- Project save history
- Team accounts / workspaces
- Framework support (React, Vue, etc.)
- Advanced customization options (colors, layout, etc.)

## 🧱 Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: API route in Next.js
- **Auth**: NextAuth (Email + Google)
- **Database**: Supabase (or Postgres)
- **Payments**: Stripe
- **AI**: OpenAI GPT-4o Vision (server-side API call)

## 🗂️ Folder Suggestions

/app
/api
/components
/utils
/lib
/types
/public
/styles

## 🎨 Design Reference

- Bolt-designed UI components (already imported)
- Font: Inter via Google Fonts
- Color: `primary: #6366f1` (Indigo-500 from Tailwind)
- Animations: Custom `fadeIn`, `slideUp`, `bounceGentle` in `tailwind.config.ts`

## 💸 Pricing Plan (Draft)

- **Free Plan**: 3–5 free conversions, no login required
- **Pro Plan**: $10/month, unlimited conversions, priority queue

## 🔗 Notes

- OpenAI Vision API is paid per image/token, so rate limiting is important
- Screenshot input must be clear UI (not photos or complex 3D art)
- Focus on speed, minimal friction, and a dev-friendly experience
