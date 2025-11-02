# Tap2Give Receipt Viewer

Online receipt display system for Tap2Give donation receipts.

## Overview

This Next.js application provides a web-based receipt viewer for donations made through the Tap2Give system. Receipts are accessible via unique URLs sent to donors via email or SMS.

## Features

- Server-side rendered receipt pages matching email receipt format
- Dynamic routing: `/r/[receiptId]`
- Automatic expiration handling (90-day receipt lifetime)
- Mobile-optimized responsive design
- Print-friendly CSS
- 404 error handling for invalid or expired receipts
- Real-time mosque branding from Firestore

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Firebase Firestore (read-only access)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file with Firebase config:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add all Firebase config variables from `.env.local`

### Option 2: Using GitHub Integration

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit - Receipt viewer for Tap2Give"
git remote add origin your_github_repo_url
git push -u origin main
```

2. Connect repository in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure environment variables
   - Deploy

### Environment Variables for Vercel

Add these in Vercel dashboard (Project Settings > Environment Variables):

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

### Custom Domain Setup

1. In Vercel dashboard, go to Domains
2. Add `app.tap2giveapp.com`
3. Configure DNS records as instructed by Vercel

## File Structure

```
app/
├── r/
│   └── [receiptId]/
│       ├── page.tsx        # Dynamic receipt page
│       └── not-found.tsx   # 404 error page
├── layout.tsx              # Root layout
├── page.tsx                # Homepage
└── globals.css             # Global styles

lib/
└── firebase.ts             # Firebase client config
```

## Receipt Data Structure

### Firestore Collections

**`/receipts/{receiptId}`**
- `receiptId`: Receipt ID (don_{timestamp}_{random})
- `donationId`: Original donation ID
- `mosqueCode`: Mosque identifier
- `amount`: Donation amount
- `donationTimestamp`: Unix timestamp
- `contact`: Email (plain text) or phone hash (SHA-256)
- `method`: "email" or "sms"
- `sent`: Boolean
- `createdAt`: Firestore timestamp
- `expiresAt`: Firestore timestamp (90 days)
- `timezone`: Donor timezone

**`/mosques/{mosqueCode}`**
- `mosqueName`: Display name
- `mosqueCode`: Unique identifier
- `brandColor`: Hex color code
- `logoUrl`: Logo image URL
- `taxId`: EIN/Tax ID
- `address`: Multi-line address
- `contactEmail`: Support email

## License

© 2025 ASR Technologies LLC
