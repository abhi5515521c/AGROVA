# 🚀 Deployment Guide - AGROVA Website

This guide covers multiple deployment options for your agritech website.

## 📋 Pre-Deployment Checklist

- [ ] Test website locally
- [ ] Verify all images load correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify contact form functionality
- [ ] Optimize images (compress if needed)
- [ ] Add Google Analytics (optional)
- [ ] Update meta tags and SEO information
- [ ] Test 3D elements performance

## 🌐 Deployment Options

### Option 1: GitHub Pages (FREE) ⭐ Recommended for Static Sites

**Pros**: Free, easy, custom domain support, HTTPS included
**Cons**: Public repository required (or GitHub Pro for private)

#### Steps:

1. **Create GitHub Repository**
   ```bash
   cd agritech-website
   git init
   git add .
   git commit -m "Initial commit: AGROVA website"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/farmengineer.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save

4. **Access Your Site**
   - URL: `https://yourusername.github.io/farmengineer/`
   - Custom domain: Add CNAME file with your domain

**Custom Domain Setup:**
```bash
echo "www.farmengineer.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

Then update your DNS:
- Type: CNAME
- Name: www
- Value: yourusername.github.io

---

### Option 2: Netlify (FREE) ⭐ Recommended for Beginners

**Pros**: Drag-and-drop deployment, free SSL, form handling, continuous deployment
**Cons**: Limited build minutes on free tier (not an issue for static sites)

#### Method A: Drag and Drop

1. Go to [netlify.com](https://netlify.com)
2. Sign up / Log in
3. Drag the `agritech-website` folder to the deployment area
4. Done! Your site is live

#### Method B: Git Integration

1. Push code to GitHub (see Option 1, steps 1-2)
2. Go to Netlify → "New site from Git"
3. Connect to GitHub
4. Select repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.` or `/`
6. Deploy!

**Custom Domain:**
- Netlify Dashboard → Domain settings → Add custom domain
- Update DNS to point to Netlify

**Form Handling:**
Update contact form in `index.html`:
```html
<form name="contact" method="POST" data-netlify="true">
  <!-- form fields -->
</form>
```

---

### Option 3: Vercel (FREE)

**Pros**: Fast deployment, excellent performance, free SSL
**Cons**: Requires account

#### Steps:

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd agritech-website
   vercel
   ```

3. **Or use Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import Git repository
   - Deploy

---

### Option 4: Firebase Hosting (FREE)

**Pros**: Google infrastructure, fast CDN, free SSL
**Cons**: Requires Firebase account

#### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**
   ```bash
   firebase login
   ```

3. **Initialize**
   ```bash
   cd agritech-website
   firebase init hosting
   ```
   - Select: Create new project or use existing
   - Public directory: `.` (current directory)
   - Single-page app: No
   - GitHub integration: Optional

4. **Deploy**
   ```bash
   firebase deploy
   ```

---

### Option 5: Traditional Web Hosting (cPanel, etc.)

**Pros**: Full control, can use existing hosting
**Cons**: Costs money, requires FTP knowledge

#### Steps:

1. **Connect via FTP**
   - Use FileZilla, Cyberduck, or cPanel File Manager
   - Host: your-domain.com
   - Username: your-username
   - Password: your-password

2. **Upload Files**
   - Upload all files to `public_html` or `www` directory
   - Maintain folder structure

3. **Verify**
   - Visit your domain
   - Test all functionality

---

### Option 6: AWS S3 + CloudFront

**Pros**: Highly scalable, professional, fast CDN
**Cons**: More complex, costs (minimal for static sites)

#### Steps:

1. **Create S3 Bucket**
   - AWS Console → S3 → Create bucket
   - Name: farmengineer.com
   - Region: Choose closest to your audience
   - Uncheck "Block all public access"

2. **Upload Files**
   - Upload all website files to bucket
   - Set permissions to public read

3. **Enable Static Website Hosting**
   - Bucket → Properties → Static website hosting
   - Enable
   - Index document: index.html

4. **Optional: CloudFront CDN**
   - Create CloudFront distribution
   - Origin: S3 bucket
   - Enable HTTPS

---

## 🔧 Post-Deployment Configuration

### 1. SSL Certificate (HTTPS)
Most platforms provide free SSL. If not:
- Use [Let's Encrypt](https://letsencrypt.org/)
- Or CloudFlare (free tier)

### 2. Custom Domain Setup

**DNS Configuration:**
```
Type: A
Name: @
Value: [hosting IP address]

Type: CNAME
Name: www
Value: [hosting domain]
```

### 3. Performance Optimization

**Image Optimization:**
```bash
# Install image optimizer
npm install -g imagemin-cli

# Optimize images
imagemin assets/images/* --out-dir=assets/images/optimized
```

**Enable Gzip Compression:**
Add to `.htaccess` (if using Apache):
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

### 4. Analytics Setup

**Google Analytics:**
```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 5. SEO Optimization

**Update meta tags in index.html:**
```html
<meta name="description" content="Your description">
<meta property="og:title" content="AGROVA - Agritech Solutions">
<meta property="og:description" content="Redesigning Indian farms with agrivoltaics">
<meta property="og:image" content="https://yoursite.com/og-image.jpg">
<meta property="og:url" content="https://yoursite.com">
<meta name="twitter:card" content="summary_large_image">
```

**Create sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://farmengineer.com/</loc>
    <lastmod>2026-02-06</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Create robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://farmengineer.com/sitemap.xml
```

---

## 📊 Monitoring & Maintenance

### Performance Monitoring
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### Uptime Monitoring
- [UptimeRobot](https://uptimerobot.com/) - Free
- [Pingdom](https://www.pingdom.com/)

### Error Tracking
- Browser Console (F12)
- Google Search Console

---

## 🔄 Continuous Deployment

### GitHub Actions (Automated Deployment)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## 🆘 Troubleshooting

### Issue: 3D elements not loading
- Check browser console for errors
- Verify Three.js CDN is accessible
- Test on different browsers

### Issue: Images not showing
- Check file paths (case-sensitive on Linux servers)
- Verify images are uploaded
- Check browser console for 404 errors

### Issue: Contact form not working
- Implement backend API or use Netlify forms
- Check CORS settings if using external API

### Issue: Slow loading
- Optimize images
- Enable CDN
- Minify CSS/JS
- Enable caching

---

## 📞 Support

For deployment issues:
- Check hosting provider documentation
- Search Stack Overflow
- Contact hosting support

---

## ✅ Final Checklist

Before going live:
- [ ] All content is accurate
- [ ] Contact information is correct
- [ ] Forms are tested and working
- [ ] All links work
- [ ] Images are optimized
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] SEO meta tags added
- [ ] Sitemap created
- [ ] Robots.txt added
- [ ] Custom domain configured
- [ ] Performance tested
- [ ] Backup created

---

**🎉 Congratulations! Your website is now live!**

*Remember to regularly update content and monitor performance.*
