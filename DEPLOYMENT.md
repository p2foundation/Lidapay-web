# Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub/GitLab/Bitbucket repository (optional, but recommended)
- Environment variables configured

## Quick Deploy

### Option 1: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your Git repository or upload the project
3. Configure environment variables (see below)
4. Click "Deploy"

## Environment Variables

Set these in your Vercel project settings (Settings → Environment Variables):

```
NEXT_PUBLIC_API_BASE_URL=https://api.advansistechnologies.com
NEXT_PUBLIC_API_VERSION=/api/v1
```

## Build Configuration

The project is already configured for Vercel:
- ✅ `vercel.json` - Vercel configuration
- ✅ `next.config.mjs` - Next.js configuration with image optimization
- ✅ Build command: `npm run build`
- ✅ Output directory: `.next` (default)

## Build Verification

The build completed successfully with:
- ✅ All TypeScript errors fixed
- ✅ All pages generated (29 routes)
- ✅ Static optimization enabled
- ✅ Image domains configured

## Post-Deployment Checklist

1. **Verify Environment Variables**
   - Check that `NEXT_PUBLIC_API_BASE_URL` is set correctly
   - Check that `NEXT_PUBLIC_API_VERSION` is set correctly

2. **Test Key Features**
   - [ ] Landing page loads correctly
   - [ ] User registration/login works
   - [ ] Airtime purchase flow works
   - [ ] Data bundle purchase works
   - [ ] Language switching works
   - [ ] Currency switching works
   - [ ] Payment callback works

3. **Check API Endpoints**
   - [ ] Countries API: `/api/v1/reloadly/countries`
   - [ ] Airtime API: `/api/v1/airtime/topup` (Ghana)
   - [ ] Payment API: `/api/v1/payment/*`

4. **Performance**
   - [ ] Check Lighthouse scores
   - [ ] Verify image optimization
   - [ ] Check bundle sizes

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Monitoring

- Vercel Analytics (optional): Enable in project settings
- Error tracking: Check Vercel logs for runtime errors

## Troubleshooting

### Build Fails
- Check environment variables are set
- Verify Node.js version (should be 18+)
- Check build logs in Vercel dashboard

### API Errors
- Verify `NEXT_PUBLIC_API_BASE_URL` is correct
- Check CORS settings on backend
- Verify API endpoints are accessible

### Images Not Loading
- Check `next.config.mjs` remote patterns
- Verify image URLs are accessible

## Support

For issues, check:
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
