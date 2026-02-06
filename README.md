# 🌾 AGROVA - Agritech Website

A modern, interactive website for an agritech company that redesigns Indian farms using agrivoltaics, hydroponics, vertical polyhouses, soil intelligence, and solar integration.

## 🎯 Project Overview

This website showcases how traditional Indian farms can be transformed into engineered, multi-income systems that produce food, energy, and maximize water efficiency.

### Key Message
**"Indian farms are cultivated, not engineered. We redesign farms."**

## ✨ Features

### 1. **Hero Section**
- Bold headline with animated background
- Animated statistics counter
- Smooth scroll indicator
- 3D particle background using Three.js

### 2. **Problem Section**
- Scroll-triggered animations
- 5 key farming problems visualized
- Interactive cards with hover effects

### 3. **Interactive Farm Design** ⭐
- **3D Farm Viewer** with toggleable layers:
  - Soil crops
  - Agrivoltaic solar panels
  - Hydroponic vertical units
  - Mulch layer
  - Smart irrigation system
- View controls (Top, Side, Perspective)
- Real-time efficiency statistics
- **Embedded Sketchfab 3D Model** of Agri-Photovoltaic Plant
- Modular design for easy 3D model integration

### 4. **How We Work Timeline**
- 6-step process visualization
- Animated timeline with scroll effects
- Feature lists for each step

### 5. **Technology Stack**
- Visual explanation of 6 core technologies
- Animated tech cards
- Benefit metrics for each technology

### 6. **Farmer Benefits**
- 5 key benefits with metrics
- Before/After comparison slider
- Interactive image comparison

### 7. **Vision Section**
- Bold statement with animated background
- 3D geometric animations

### 8. **Contact Section**
- Three user types: Farmers, Investors, Institutions
- Dynamic contact form
- Feature lists for each audience

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No framework dependencies
- **Three.js** - 3D graphics and animations

### Design System
- **Colors**: Earthy palette (soil brown, solar gold, plant green)
- **Typography**: Inter (body), Outfit (headings)
- **Animations**: Smooth, premium micro-interactions
- **Responsive**: Desktop-first, mobile-friendly

## 📁 Project Structure

```
agritech-website/
├── index.html                 # Main HTML file
├── assets/
│   └── images/
│       ├── farm-before.jpg    # Traditional farm image
│       └── farm-after.jpg     # Engineered farm image
├── styles/
│   ├── main.css              # Core styles and design tokens
│   ├── components.css        # Component-specific styles
│   └── animations.css        # Animation keyframes and effects
├── js/
│   ├── main.js               # Core functionality
│   ├── three-setup.js        # 3D background animations
│   ├── farm-interactive.js   # Interactive farm viewer
│   └── animations.js         # Animation utilities
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required!

### Installation

1. **Download the project**
   ```bash
   # If you have the files, just navigate to the directory
   cd agritech-website
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance:
   
   **Option A: Python**
   ```bash
   python -m http.server 8000
   ```
   
   **Option B: Node.js (if installed)**
   ```bash
   npx http-server
   ```
   
   **Option C: VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **View the website**
   - Open `http://localhost:8000` in your browser

## 🎨 Customization Guide

### Changing Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
    --color-soil-brown: hsl(30, 35%, 25%);
    --color-solar-gold: hsl(45, 95%, 55%);
    --color-plant-green: hsl(120, 45%, 45%);
    /* ... more colors */
}
```

### Adding New Sections
1. Add HTML section in `index.html`
2. Add styles in `styles/components.css`
3. Add JavaScript interactions in `js/main.js`

### Integrating Real 3D Models
The farm viewer is designed to accept external 3D models:

1. **Using GLTF/GLB models:**
   ```javascript
   // In js/farm-interactive.js
   const loader = new THREE.GLTFLoader();
   loader.load('path/to/model.glb', (gltf) => {
       farmScene.add(gltf.scene);
   });
   ```

2. **Using Sketchfab API:**
   - Already integrated in the HTML
   - Replace the model ID in the iframe src

### Updating Content
- **Statistics**: Edit `data-target` attributes in hero section
- **Problems**: Modify `.problem-card` elements
- **Technologies**: Update `.tech-card` content
- **Timeline**: Edit `.timeline-item` sections

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1280px+ (primary design)
- **Tablet**: 768px - 1024px
- **Mobile**: 320px - 767px

## ⚡ Performance Optimizations

- **Lazy Loading**: Images load only when visible
- **Throttled Scroll Events**: Optimized scroll listeners
- **Debounced Resize**: Efficient window resize handling
- **Intersection Observer**: Efficient scroll animations
- **Optimized 3D**: Limited polygon count, efficient rendering

## 🔧 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎯 Future Enhancements

### Ready for Integration:
1. **AR/VR Support** - Farm viewer supports WebXR
2. **Advanced 3D Models** - Replace placeholder geometries
3. **Backend Integration** - Contact form ready for API
4. **CMS Integration** - Modular structure for easy content updates
5. **Analytics** - Add Google Analytics or similar
6. **Multi-language** - Structure supports i18n

### Suggested Additions:
- Case studies section
- Farmer testimonials
- ROI calculator
- Blog/News section
- Video demonstrations
- Live chat support

## 📊 SEO Features

- Semantic HTML5 structure
- Meta descriptions
- Proper heading hierarchy
- Alt text for images (add as needed)
- Fast loading times
- Mobile-friendly design

## 🔐 Security Notes

- No external dependencies (except CDN for Three.js)
- No sensitive data storage
- Form validation included
- HTTPS recommended for production

## 📝 Content Guidelines

### Tone
- Simple English
- Farmer-friendly language
- Confident, not salesy
- Technical but accessible

### Messaging
- Focus on engineering vs. cultivation
- Emphasize multi-income streams
- Highlight sustainability
- Show real benefits with numbers

## 🤝 Contributing

To add new features:
1. Follow the existing code structure
2. Use CSS variables for consistency
3. Add comments for complex logic
4. Test on multiple devices
5. Optimize for performance

## 📞 Support

For technical support or questions:
- Email: info@farmengineer.com
- Phone: +91 98765 43210

## 📄 License

This project is proprietary. All rights reserved.

## 🙏 Acknowledgments

- **Three.js** - 3D graphics library
- **Google Fonts** - Inter and Outfit fonts
- **Sketchfab** - 3D model hosting (VIS-All-3D for the agrivoltaic model)

## 🚀 Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
Enable GitHub Pages in repository settings.

### Netlify
1. Drag and drop the folder to Netlify
2. Or connect GitHub repository
3. Deploy!

### Vercel
```bash
vercel
```

## 📈 Analytics Setup

Add to `<head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎨 Design Philosophy

1. **Premium First Impression** - Wow users immediately
2. **Educational** - Explain complex tech simply
3. **Interactive** - Engage users with 3D and animations
4. **Scalable** - Easy to add new content
5. **Performance** - Fast loading, smooth animations

---

**Built with ❤️ for sustainable agriculture**

*"We are not improving farming. We are redesigning farms."*
