# Photo Collage Maker

A lightweight, browser-based photo collage generator that lets you combine multiple images into a clean, customizable grid layout.
Built with Vanilla JavaScript + HTML5 Canvas, no frameworks, no installation required.

---

## Highlights

- Predefined Grid Templates (2×2 → 10×10)
- Custom Image Count (1–100)
- Flexible Column Control (1–10 columns)
- Background Color Picker with live preview
- Adjustable Spacing between images
- Light / Dark Mode (saved automatically)
- Canvas-based Rendering
- High-quality PNG Download
- Responsive Layout

---

## Core Features

### Grid System

- Built with CSS Grid
- Column count controlled via CSS Variables
- Dynamic grid re-rendering on every change
- Square (1:1) image slots

### Image Management

- Upload multiple images from local device
- Click empty grid cells to add images
- Remove images individually
- Clear all images at once
- Image data handled via FileReader API

### Customization Options

- Spacing control between grid items
- Background color picker
- Real-time color preview
- Theme toggle (Light / Dark)

### Canvas Rendering

- Rendered using HTML5 Canvas API
- Fixed cell size: 400 × 400 px
- Canvas size auto-calculated from grid settings
- Background color filled before drawing images

### Theme System

- Light / Dark mode toggle
- Theme stored in localStorage
- Controlled via dark-mode class on <html>
- Smooth visual transitions

---

## How to Use

1. **Choose a Layout**
   - Select a Quick Template
   - Or manually set image count & columns

2. **Customize**
   - Adjust spacing
   - Pick a background color
   - Toggle Light / Dark mode

3. **Add Images**
   - Upload images from your device
   - Or click empty slots to add images

4. **Generate Collage**
   - Click Generate Collage
   - Preview appears on the canvas

5. **Download**
   - Click Download
   - Saved as collage_<timestamp>.png

6. **Clear & Restart**
   - Click Delete to reset everything

---

## Tech Stack

**HTML5**
- Structure & SEO

**CSS3**
- CSS Grid
- CSS Variables
- Responsive Design
- Animations & Transitions

**Vanilla JavaScript**
- Canvas API
- FileReader API
- Local Storage

**Google Fonts**
- Google Sans
- Sarabun

---

## Project Structure

```
Photo Collage Maker/
├── index.html      # UI structure & SEO
├── style.css       # Styling, themes, responsiveness
├── script.js       # Logic & canvas rendering
├── img/            # Assets
└── README.md
```

---

## Limitations

- No drag & drop support
- No per-image crop or zoom
- Images forced into square (1:1) ratio
- Large grids may take longer to render
