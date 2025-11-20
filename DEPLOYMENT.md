# Deployment Guide - Beat Preston

This guide covers deploying the Beat Preston interactive game to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] All tests passing locally
- [ ] Production build works: `npm run build && npm run preview`
- [ ] Environment variables configured (if needed)
- [ ] Repository pushed to GitHub
- [ ] Custom domain ready (optional)

## 🚀 Deployment Options

### Option 1: Netlify (Recommended for Quick Deploy)

#### Method A: Deploy from GitHub (Recommended)

1. **Connect Repository**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select the `beat-preston` repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live at: `https://random-name.netlify.app`

4. **Custom Domain (Optional)**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Follow DNS configuration instructions

#### Method B: Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

**Configuration:** Uses `netlify.toml` in the repository

---

### Option 2: Vercel (Recommended for Performance)

#### Method A: Deploy from GitHub (Recommended)

1. **Import Project**
   - Go to [Vercel](https://vercel.com/)
   - Click "Add New" → "Project"
   - Import the `beat-preston` repository from GitHub

2. **Configure Project**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build (~2 minutes)
   - Live at: `https://beat-preston.vercel.app`

#### Method B: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Configuration:** Uses `vercel.json` in the repository

---

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

Update `vite.config.ts` with base path:
```typescript
export default defineConfig({
  base: '/beat-preston/',
  // ... rest of config
})
```

---

### Option 4: Custom Server (VPS/AWS/DigitalOcean)

#### Requirements
- Node.js 18+
- Nginx (reverse proxy)
- PM2 (process manager)

#### Setup Steps

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Serve Static Files**

   Using Nginx:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/beat-preston/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. **SSL Certificate**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔧 Environment Variables

Currently, the frontend doesn't require environment variables for deployment. If you integrate with the backend API later:

### Create `.env.production`
```bash
VITE_API_URL=https://api.yourdomain.com
```

### Configure in Hosting Platform

**Netlify:**
- Site settings → Environment variables
- Add: `VITE_API_URL`

**Vercel:**
- Project Settings → Environment Variables
- Add: `VITE_API_URL` (Production)

---

## 🎯 Post-Deployment

### 1. Test Live Site
- [ ] Homepage loads correctly
- [ ] All 3 game tasks work
- [ ] Form submission works
- [ ] Score calculation accurate
- [ ] Mobile/tablet responsive
- [ ] All images load

### 2. Performance Optimization

**Check Performance:**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

**Target Metrics:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

### 3. SEO Setup

Add to `index.html`:
```html
<meta name="description" content="Beat Preston - Interactive AI game for estate agents. Compete against AI to discover automation opportunities.">
<meta property="og:title" content="Beat Preston - AI Estate Agent Challenge">
<meta property="og:description" content="Can you beat Preston? Test your estate agency skills against AI automation.">
<meta property="og:image" content="/og-image.png">
```

### 4. Analytics Setup

**Google Analytics:**
```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔄 Continuous Deployment

### Automatic Deploys on Git Push

**Netlify & Vercel:**
- Automatically deploy on push to `main` branch
- Preview deployments for pull requests

### Deploy from Specific Branch

**Netlify:**
```toml
# netlify.toml
[context.production]
  branch = "main"

[context.staging]
  branch = "staging"
```

**Vercel:**
- Production: `main` branch
- Preview: All other branches

---

## 📱 iPad Kiosk Mode Setup

For event deployment on iPads:

### 1. Safari Settings
- Enable "Guided Access" (Settings → Accessibility)
- Add website to Home Screen
- Launch in fullscreen mode

### 2. Auto-Refresh Setup
Add to your deployment:
```javascript
// Reset after 2 minutes of inactivity
let timeout;
function resetTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    window.location.href = '/';
  }, 120000);
}
document.addEventListener('click', resetTimer);
document.addEventListener('touchstart', resetTimer);
resetTimer();
```

### 3. Kiosk App (Optional)
Use apps like:
- Kiosk Pro (iOS)
- Fully Kiosk Browser (Android)

---

## 🔒 Security Checklist

- [x] HTTPS enabled
- [x] Security headers configured
- [x] XSS protection enabled
- [x] CORS configured properly
- [ ] Rate limiting (if using backend)
- [ ] Input validation on forms
- [ ] CSP headers (Content Security Policy)

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Not Working (404 on Refresh)

- Ensure redirects are configured (see platform configs above)
- Check `netlify.toml` or `vercel.json` exists

### Images Not Loading

```bash
# Check public folder structure
public/
├── greenhouse-logo.png
├── preston-avatar.png
├── marketplace-left.png
└── marketplace-right.png
```

### Slow Load Times

1. Check bundle size: `npm run build -- --analyze`
2. Enable compression in hosting settings
3. Optimize images (compress, convert to WebP)
4. Enable CDN caching

---

## 📊 Monitoring

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

### Error Tracking
- Sentry
- LogRocket
- Bugsnag

### Analytics
- Google Analytics
- Mixpanel
- Plausible

---

## 🆘 Support

For deployment issues:
1. Check platform status pages
2. Review build logs
3. Test local production build: `npm run build && npm run preview`
4. Contact hosting support

---

## 📚 Quick Reference

### Common Commands

```bash
# Local development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Deploy to Netlify
netlify deploy --prod

# Deploy to Vercel
vercel --prod
```

### Platform URLs

- **Netlify Dashboard:** https://app.netlify.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repository:** https://github.com/fosco130/beat-preston

---

## ✅ Deployment Checklist

Pre-Deploy:
- [ ] Code pushed to GitHub
- [ ] Build succeeds locally
- [ ] All features tested
- [ ] Performance acceptable

Platform Setup:
- [ ] Platform account created
- [ ] Repository connected
- [ ] Build settings configured
- [ ] Environment variables set (if needed)

Post-Deploy:
- [ ] Site accessible
- [ ] All routes work
- [ ] Forms functional
- [ ] Images load
- [ ] Analytics configured
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance tested

---

**Your Beat Preston game is ready to go live! 🚀**

Choose your preferred platform above and follow the steps. Most deployments complete in under 5 minutes!
