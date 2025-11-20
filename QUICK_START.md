# 🚀 Beat Preston - Quick Start Guide

## Repository
**GitHub:** https://github.com/fosco130/beat-preston

## Quick Deploy (Choose One)

### Option 1: Netlify (Easiest - 2 minutes)

1. Click this button:
   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/fosco130/beat-preston)

2. Or manually:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub → `fosco130/beat-preston`
   - Click "Deploy site"
   - Done! Live in ~2 minutes

**Your site will be:** `https://random-name.netlify.app`

### Option 2: Vercel (Fast - 2 minutes)

1. Click this button:
   [![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fosco130/beat-preston)

2. Or manually:
   - Go to [Vercel](https://vercel.com/)
   - Click "Add New" → "Project"
   - Import `fosco130/beat-preston` from GitHub
   - Click "Deploy"
   - Done! Live in ~2 minutes

**Your site will be:** `https://beat-preston.vercel.app`

### Option 3: CLI Deploy

```bash
# Clone repository
git clone https://github.com/fosco130/beat-preston.git
cd beat-preston

# Install dependencies
npm install

# Build
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify login
netlify deploy --prod

# OR deploy to Vercel
npm install -g vercel
vercel login
vercel --prod
```

## Local Development

```bash
# Clone and setup
git clone https://github.com/fosco130/beat-preston.git
cd beat-preston
npm install

# Start dev server
npm run dev
# Open http://localhost:5173

# Build for production
npm run build
npm run preview
```

## Custom Domain Setup

### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `beatpreston.com`)
4. Follow DNS instructions

### Vercel
1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain
4. Update DNS records as shown

## Documentation

- **📖 Full README:** [README.md](README.md)
- **🚀 Deployment Guide:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **🤝 Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **📝 Changelog:** [CHANGELOG.md](CHANGELOG.md)

## File Structure

```
beat-preston/
├── src/                      # Source code
│   ├── pages/               # 12 game screens
│   ├── components/          # Reusable UI components
│   ├── styles/              # Theme and global styles
│   └── data/                # Game data
├── public/                  # Static assets
├── .github/                 # GitHub Actions & templates
├── netlify.toml            # Netlify config (ready to deploy)
├── vercel.json             # Vercel config (ready to deploy)
├── DEPLOYMENT.md           # Detailed deployment guide
├── CONTRIBUTING.md         # Development guidelines
└── package.json            # Project metadata
```

## Environment Setup (Optional)

If you need to connect to a backend API later:

1. Create `.env.production`:
   ```bash
   VITE_API_URL=https://your-api-url.com
   ```

2. Add to Netlify/Vercel:
   - Site Settings → Environment Variables
   - Add: `VITE_API_URL`

## Next Steps

### After Deployment

1. **Test Your Site**
   - [ ] All 3 tasks work
   - [ ] Forms submit correctly
   - [ ] Scores calculate properly
   - [ ] Responsive on mobile/tablet

2. **Custom Branding**
   - Update `public/greenhouse-logo.png`
   - Update colors in `src/styles/theme.ts`

3. **Analytics** (Optional)
   - Add Google Analytics to `index.html`
   - Configure conversion tracking

4. **Event Setup**
   - Test on iPad
   - Set up fullscreen mode
   - Configure kiosk auto-reset

## Support

- **Issues:** https://github.com/fosco130/beat-preston/issues
- **Documentation:** See files above
- **Deployment Help:** [DEPLOYMENT.md](DEPLOYMENT.md)

## Features

✅ **3 Interactive Challenges**
- Task 1: Lead Response (90 seconds)
- Task 2: Spot Hot Sellers (data analysis)
- Task 3: AI vs Human Tasks

✅ **Complete Experience**
- Real-time scoring
- Preston AI competition
- Leaderboard
- Multi-step lead capture form
- £2,000 prize incentive
- ROI calculator

✅ **Production Ready**
- TypeScript throughout
- Optimized build
- Responsive design
- SEO friendly
- Security headers
- Fast loading

## Quick Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Test production build
npm run lint         # Check code quality
npm run type-check   # TypeScript validation
```

---

**Ready to deploy in under 5 minutes! 🚀**

Choose Netlify or Vercel above and click the deploy button.
