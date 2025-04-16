
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'images/*.{png,jpg,jpeg}'],
      manifest: {
        id: "ezton-electronics-pwa",
        name: "Ezton E&E Ltd",
        short_name: "Ezton",
        description: "Premium security and electrical solutions including CCTV, solar systems, and access control for homes and businesses in Uganda.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "en",
        dir: "ltr",
        categories: [
          "business",
          "security",
          "shopping"
        ],
        prefer_related_applications: false,
        display_override: [
          "fullscreen",
          "window-controls-overlay"
        ],
        launch_handler: {
          client_mode: "auto"
        },
        icons: [
          {
            src: '/images/ezton_logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/images/ezton_logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
