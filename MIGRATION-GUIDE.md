# 🔄 Migration Guide: HTML → React/Next.js

This guide helps you migrate the current HTML/CSS/JS website to React or Next.js when ready.

## 🎯 Why Migrate?

### Current Setup (HTML/CSS/JS)
**Pros:**
- ✅ Fast, lightweight
- ✅ No build process
- ✅ Easy to deploy
- ✅ No dependencies

**Cons:**
- ❌ Manual DOM manipulation
- ❌ No component reusability
- ❌ Harder to scale
- ❌ No server-side rendering

### React/Next.js
**Pros:**
- ✅ Component-based architecture
- ✅ Reusable components
- ✅ Better state management
- ✅ Server-side rendering (Next.js)
- ✅ Better SEO (Next.js)
- ✅ Hot reload during development

**Cons:**
- ❌ Build process required
- ❌ More complex setup
- ❌ Larger bundle size

---

## 🚀 Migration Path

### Option 1: Gradual Migration (Recommended)
Keep current site live, build React version in parallel.

### Option 2: Direct Migration
Convert entire site at once.

---

## 📋 Step-by-Step Migration

### Phase 1: Setup Next.js Project

```bash
# Create Next.js app
npx create-next-app@latest farmengineer-nextjs --typescript --tailwind --app

# Navigate to project
cd farmengineer-nextjs

# Install dependencies
npm install three @react-three/fiber @react-three/drei
npm install framer-motion # for animations
npm install react-intersection-observer
```

### Phase 2: Project Structure

```
farmengineer-nextjs/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   └── components/
│       ├── Hero.tsx
│       ├── Problem.tsx
│       ├── FarmDesign.tsx
│       ├── Timeline.tsx
│       ├── Technology.tsx
│       ├── Benefits.tsx
│       ├── Vision.tsx
│       └── Contact.tsx
├── public/
│   └── images/
│       ├── farm-before.jpg
│       └── farm-after.jpg
└── lib/
    ├── three-setup.ts
    └── animations.ts
```

### Phase 3: Convert Components

#### Example: Hero Component

**Current (HTML):**
```html
<section id="hero" class="hero-section">
    <h1 class="hero-title">
        <span class="title-line">Indian farms are</span>
        <span class="title-line highlight">cultivated, not engineered.</span>
    </h1>
</section>
```

**React/Next.js:**
```tsx
// app/components/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Three.js setup
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    // ... rest of Three.js code
    
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />
      
      <div className="relative z-10 text-center max-w-6xl px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-black mb-6"
        >
          <span className="block text-soil-brown">Indian farms are</span>
          <span className="block bg-gradient-to-r from-solar-gold to-solar-dark bg-clip-text text-transparent">
            cultivated, not engineered.
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl text-gray-700 mb-8"
        >
          We redesign farms to produce food, energy, and income together.
        </motion.p>
        
        <motion.a
          href="#farm-design"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-solar-gold to-solar-dark text-white px-10 py-5 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
        >
          <span>See How It Works</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
```

#### Example: Farm Design Component

```tsx
// app/components/FarmDesign.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';

interface FarmLayers {
  soil: boolean;
  solar: boolean;
  hydro: boolean;
  mulch: boolean;
  irrigation: boolean;
}

export default function FarmDesign() {
  const [layers, setLayers] = useState<FarmLayers>({
    soil: true,
    solar: true,
    hydro: true,
    mulch: true,
    irrigation: true,
  });

  const toggleLayer = (layer: keyof FarmLayers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const activeLayers = Object.values(layers).filter(Boolean).length;
  const efficiency = (activeLayers / 5) * 100;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-off-white">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-4">Interactive Farm Design</h2>
        <p className="text-xl text-center text-gray-700 mb-16 max-w-2xl mx-auto">
          Toggle different elements to see how we engineer complete farm systems
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 3D Viewer */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
            <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
              <OrbitControls enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 2} />
              
              {/* Farm Elements */}
              {layers.soil && <SoilLayer />}
              {layers.solar && <SolarPanels />}
              {layers.hydro && <HydroponicUnits />}
              {layers.mulch && <MulchLayer />}
              {layers.irrigation && <IrrigationSystem />}
            </Canvas>
          </div>
          
          {/* Controls */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Farm Elements</h3>
            
            <div className="space-y-4">
              {Object.entries(layers).map(([key, value]) => (
                <ToggleItem
                  key={key}
                  label={key}
                  checked={value}
                  onChange={() => toggleLayer(key as keyof FarmLayers)}
                />
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t-2 grid grid-cols-2 gap-4">
              <div className="text-center">
                <span className="block text-sm text-gray-700 mb-2">Layers Active</span>
                <span className="block text-3xl font-black bg-gradient-to-r from-plant-green to-plant-light bg-clip-text text-transparent">
                  {activeLayers}
                </span>
              </div>
              <div className="text-center">
                <span className="block text-sm text-gray-700 mb-2">Efficiency</span>
                <span className="block text-3xl font-black bg-gradient-to-r from-plant-green to-plant-light bg-clip-text text-transparent">
                  {Math.round(efficiency)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Component for individual 3D layers
function SoilLayer() {
  return (
    <group>
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ... other layer components
```

### Phase 4: Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'soil-brown': 'hsl(30, 35%, 25%)',
        'soil-light': 'hsl(30, 25%, 45%)',
        'solar-gold': 'hsl(45, 95%, 55%)',
        'solar-dark': 'hsl(40, 85%, 45%)',
        'plant-green': 'hsl(120, 45%, 45%)',
        'plant-light': 'hsl(120, 55%, 65%)',
        'off-white': 'hsl(30, 20%, 96%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Phase 5: Animation Migration

**Current (CSS + JS):**
```css
@keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
```

**React (Framer Motion):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* Content */}
</motion.div>
```

---

## 📦 Package Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "framer-motion": "^10.16.0",
    "react-intersection-observer": "^9.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/three": "^0.160.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 🎯 Migration Checklist

### Components to Convert:
- [ ] Hero Section
- [ ] Problem Section
- [ ] Farm Design (3D Viewer)
- [ ] Timeline
- [ ] Technology Cards
- [ ] Benefits Section
- [ ] Vision Section
- [ ] Contact Form
- [ ] Navigation
- [ ] Footer

### Features to Migrate:
- [ ] Three.js backgrounds
- [ ] Scroll animations
- [ ] Counter animations
- [ ] Comparison slider
- [ ] Form handling
- [ ] Responsive navigation

### Optimizations:
- [ ] Image optimization (next/image)
- [ ] Font optimization (next/font)
- [ ] Code splitting
- [ ] Server components
- [ ] Static generation

---

## 🚀 Deployment (Next.js)

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm start
```

---

## 📊 Performance Comparison

### Current (HTML/CSS/JS)
- Bundle: ~85 KB
- Load Time: < 2s
- No build process

### Next.js
- Bundle: ~200-300 KB (with code splitting)
- Load Time: < 1s (with SSR)
- Build process required

---

## 💡 Best Practices

1. **Use Server Components** where possible
2. **Lazy load** heavy 3D components
3. **Optimize images** with next/image
4. **Use dynamic imports** for Three.js
5. **Implement ISR** for static content
6. **Add loading states** for better UX

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Note**: Migration is optional. The current HTML/CSS/JS version is production-ready and performs excellently!
