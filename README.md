# Lidapay Web (Next.js)

Modern fintech web app for global airtime and data remittance across 150+ countries. Built with Next.js 15, React 19, and TypeScript.

## Features

- 🌍 **Global Coverage**: Send airtime and data to 150+ countries
- 💰 **Multi-Currency Support**: Switch between currencies (GHS, NGN, USD, EUR, GBP, etc.)
- 🌐 **Multi-Language**: Support for 6 languages (English, French, Spanish, Portuguese, Arabic, Swahili)
- 🔒 **Secure Payments**: Integrated with AdvansiPay payment gateway
- 📱 **Mobile App**: Available on [Google Play Store](https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay)

## Requirements
- Node.js 18+ (recommended 20+)
- npm or yarn

## Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd lidapay-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env.local` file:
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.advansistechnologies.com
NEXT_PUBLIC_API_VERSION=/api/v1
```

4. **Run development server**
```bash
npm run dev
```

Open `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy
1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables:
   - `NEXT_PUBLIC_API_BASE_URL`
   - `NEXT_PUBLIC_API_VERSION`
4. Deploy!

## API Configuration

Configured via environment variables:
- `NEXT_PUBLIC_API_BASE_URL` (default: `https://api.advansistechnologies.com`)
- `NEXT_PUBLIC_API_VERSION` (default: `/api/v1`)

## Pages & Routes

- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/app` - Dashboard (wallet balance, points, rewards, recent transactions)
- `/airtime` - Buy airtime (150+ countries)
- `/data` - Buy data bundles
- `/rewards` - Rewards & points hub
- `/transactions` - Transaction history
- `/settings` - User settings (profile, language, currency, etc.)
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Tech Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: Zod validation
- **Type Safety**: TypeScript

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable React components
├── contexts/         # React contexts (preferences, etc.)
├── lib/              # Utilities (API, formatting, storage)
└── styles/           # Global styles
```

## License

Copyright © 2025 LidaPay / Advansis Technologies. All rights reserved.

