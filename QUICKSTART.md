# 🚀 Quick Start Guide

Get your AGROVA website running in 2 minutes!

## ⚡ Fastest Method (No Installation Required)

### Option 1: Direct Browser Open
1. Navigate to the `agritech-website` folder
2. Double-click `index.html`
3. The website opens in your default browser
4. ✅ Done!

**Note**: Some features (like 3D models) work better with a local server.

---

## 🌐 Recommended Method (With Local Server)

### Using Python (Most Common)

**If you have Python installed:**

```bash
# Navigate to project folder
cd "c:\Users\sande\Desktop\New folder (3)\agritech-website"

# Python 3
python -m http.server 8000

# Python 2 (if Python 3 doesn't work)
python -m SimpleHTTPServer 8000
```

Then open: **http://localhost:8000**

---

### Using Node.js

**If you have Node.js installed:**

```bash
# Navigate to project folder
cd "c:\Users\sande\Desktop\New folder (3)\agritech-website"

# Install http-server globally (one time only)
npm install -g http-server

# Start server
http-server -p 8000
```

Then open: **http://localhost:8000**

**Or use npx (no installation):**
```bash
npx http-server -p 8000
```

---

### Using PHP

**If you have PHP installed:**

```bash
cd "c:\Users\sande\Desktop\New folder (3)\agritech-website"
php -S localhost:8000
```

Then open: **http://localhost:8000**

---

### Using VS Code Live Server

**If you use Visual Studio Code:**

1. Install "Live Server" extension by Ritwick Dey
2. Open the `agritech-website` folder in VS Code
3. Right-click `index.html`
4. Select "Open with Live Server"
5. ✅ Website opens automatically!

---

## 🎯 What to Expect

When you open the website, you should see:

1. **Hero Section** - Bold headline with animated background
2. **Problem Section** - 5 farming challenges
3. **Interactive Farm Design** - 3D viewer with toggleable layers
4. **Embedded 3D Model** - Agrivoltaic plant from Sketchfab
5. **Timeline** - 6-step process
6. **Technology Cards** - 6 technologies explained
7. **Benefits** - Before/After comparison slider
8. **Vision Statement** - Bold message
9. **Contact Form** - Three user types

---

## 🔧 Troubleshooting

### Problem: 3D elements not showing
**Solution**: Use a local server (not direct file open)

### Problem: "CORS error" in console
**Solution**: Use a local server instead of opening file directly

### Problem: Images not loading
**Solution**: Check that `assets/images/` folder exists with images

### Problem: Port 8000 already in use
**Solution**: Use a different port:
```bash
python -m http.server 8080
# or
npx http-server -p 8080
```

---

## 📱 Testing on Mobile

### Method 1: Same Network
1. Start local server on your computer
2. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` or `ip addr`
3. On mobile, visit: `http://YOUR-IP:8000`
   - Example: `http://192.168.1.100:8000`

### Method 2: ngrok (Public URL)
```bash
# Install ngrok from ngrok.com
ngrok http 8000
```
Use the provided URL on any device!

---

## ✅ Quick Checklist

After opening the website:
- [ ] Hero section loads with animations
- [ ] Statistics counter animates
- [ ] Problem cards appear on scroll
- [ ] 3D farm viewer is interactive
- [ ] Sketchfab model loads
- [ ] Toggle switches work
- [ ] Timeline animates on scroll
- [ ] Tech cards have hover effects
- [ ] Comparison slider works
- [ ] Contact form opens when clicking buttons
- [ ] All sections are visible
- [ ] No console errors (F12 to check)

---

## 🎨 Customization Quick Tips

### Change Company Name
Search and replace "AGROVA" in `index.html`

### Update Contact Info
Edit the footer section in `index.html`

### Change Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
    --color-soil-brown: hsl(30, 35%, 25%);
    --color-solar-gold: hsl(45, 95%, 55%);
    /* ... */
}
```

### Add Your Logo
Replace emoji in navigation:
```html
<span class="logo-icon">🌾</span>
<!-- Replace with: -->
<img src="assets/images/logo.png" alt="Logo">
```

---

## 📚 Next Steps

1. **Read README.md** - Full documentation
2. **Read DEPLOYMENT.md** - Deploy to production
3. **Customize content** - Make it yours!
4. **Add backend** - Connect contact form to API
5. **Add analytics** - Track visitors

---

## 🆘 Need Help?

- Check browser console (F12) for errors
- Read full README.md
- Check DEPLOYMENT.md for hosting
- Search error messages online

---

## 🎉 You're All Set!

Enjoy your modern agritech website!

**Remember**: This is a fully functional website with no dependencies except Three.js from CDN. You can customize everything!

---

**Built with ❤️ for sustainable agriculture**
