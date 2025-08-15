This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
Edit `.env.local` (already created) if needed:

Required for basic local dev (already filled with safe defaults):
```
DATABASE_URL=file:./dev.db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=changeme
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme
```
Optional (leave blank to disable integrations locally):
```
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
```

### 3. Initialize the database (SQLite)
We use SQLite locally. Create/update the DB schema:
```bash
npx prisma db push
```

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Admin login
Visit `/admin` and use the credentials from `.env.local` (default: admin@example.com / changeme).

### 6. Stripe / Email (optional)
Add your Stripe keys & webhook secret then run a local webhook forwarder (e.g. `stripe listen --forward-to localhost:3000/api/stripe/webhook`). Add a Resend API key to enable real emails; otherwise messages log to the console.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
