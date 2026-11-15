# Sravasti Bose — Portfolio

A responsive, cyber-futuristic personal portfolio built with React, Vite, Framer Motion and Lucide icons.

## Requirements
- Node.js 18 or newer
- npm

## Run locally in VS Code

1. Extract this ZIP file.
2. Open the extracted `sravasti-portfolio` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Before publishing

1. In `src/App.jsx`, replace `YOUR_EMAIL@example.com` with your professional email address (three occurrences).
2. Review project descriptions and confirm that each capability accurately reflects the current public repository.
3. Add a resume PDF to `public/` if you want a resume download link. The current design intentionally does not show a non-working download button.
4. Run a production build:

   ```bash
   npm run build
   ```

## Deploy free with Vercel

1. Push this folder to a new GitHub repository.
2. Sign in to Vercel and import that repository.
3. Vercel should detect Vite automatically.
4. Use `npm run build` as the build command and `dist` as the output directory.
5. Deploy.

## Project structure

```text
sravasti-portfolio/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Interactions included
- Animated hero entrance and typewriter terminal line
- Responsive mobile navigation
- Animated section reveals
- Project detail modals with Escape-key support
- Hover states, orbit animation, ticker and back-to-top control
- Reduced-motion accessibility support

This is a front-end portfolio. It does not require a backend or database.
