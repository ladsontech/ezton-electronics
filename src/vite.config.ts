
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
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      includeAssets: ['favicon.ico', 'robots.txt', 'images/*.{png,jpg,jpeg}'],
      injectManifest: {
        injectionPoint: undefined
      },
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
        iarc_rating_id: "e84b072d-71b3-4d3e-86ae-31a8ce4e53b7",
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
        edge_side_panel: {
          preferred_width: 480
        },
        shortcuts: [
          {
            name: "Security Solutions",
            short_name: "Security",
            description: "View our security solutions",
            url: "/solutions?category=security",
            icons: [{ src: "/images/ezton_logo.png", sizes: "192x192" }]
          },
          {
            name: "Contact Us",
            short_name: "Contact",
            description: "Get in touch with us",
            url: "/contact",
            icons: [{ src: "/images/ezton_logo.png", sizes: "192x192" }]
          }
        ],
        file_handlers: [
          {
            action: "/",
            accept: {
              "image/*": [".png", ".jpg", ".jpeg"]
            }
          }
        ],
        protocol_handlers: [
          {
            protocol: "web+ezton",
            url: "/%s"
          }
        ],
        share_target: {
          action: "/share-target",
          method: "GET",
          params: {
            title: "title",
            text: "text",
            url: "url"
          }
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
            purpose: 'maskable'
          },
          {
            src: '/images/ezton_logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
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
