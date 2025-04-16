
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register';

// Register service worker with auto update
const updateSW = registerSW({
  onNeedRefresh() {
    // Show an update notification to the user
    if (confirm('New content available. Click OK to update.')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

// Request permission for push notifications
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted');
      // Here you could subscribe the user to push notifications
    }
  });
}

// Register for periodic background sync if supported
if ('serviceWorker' in navigator && 'periodicSync' in navigator.serviceWorker) {
  navigator.serviceWorker.ready.then(registration => {
    // Try to register for periodic sync
    try {
      registration.periodicSync.register('content-update', {
        minInterval: 24 * 60 * 60 * 1000, // Once per day
      });
    } catch (error) {
      console.error('Periodic Sync could not be registered:', error);
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
