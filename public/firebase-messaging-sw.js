// Firebase Cloud Messaging Service Worker
// This file must be in the public folder

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase in service worker
firebase.initializeApp({
  apiKey: "AIzaSyCxZyH9fxQiL6kZIB-rNP3-5I9EJYTBlA4",
  authDomain: "khoaluan-2026.firebaseapp.com",
  projectId: "khoaluan-2026",
  storageBucket: "khoaluan-2026.firebasestorage.app",
  messagingSenderId: "1019302468978",
  appId: "1:1019302468978:web:4bf608e352c26b08ed91eb",
  measurementId: "G-80WC2GF4YT"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'ChemLearn';
  const notificationOptions = {
    body: payload.notification?.body || 'Bạn có thông báo mới!',
    icon: payload.notification?.icon || '/images/notification-icon.png',
    badge: '/images/badge-icon.png',
    vibrate: [100, 50, 100],
    data: payload.data || {},
    actions: [
      {
        action: 'open',
        title: 'Mở ứng dụng'
      },
      {
        action: 'dismiss',
        title: 'Đóng'
      }
    ],
    requireInteraction: true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click:', event);

  event.notification.close();

  const clickAction = event.notification.data?.click_action || '/';

  if (event.action === 'open' || !event.action) {
    // Open app or focus existing window
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
        // Check if there is already a window/tab open
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(clickAction);
            return client.focus();
          }
        }
        // If no window/tab is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(clickAction);
        }
      })
    );
  }
});

// Handle push event (if not using onBackgroundMessage)
self.addEventListener('push', (event) => {
  console.log('[firebase-messaging-sw.js] Push event:', event);

  if (!event.data) return;

  try {
    const payload = event.data.json();
    
    // Skip if already handled by onBackgroundMessage
    if (payload.notification) return;

    // Handle data-only messages
    const title = payload.data?.title || 'ChemLearn';
    const options = {
      body: payload.data?.body || 'Bạn có thông báo mới!',
      icon: '/images/notification-icon.png',
      badge: '/images/badge-icon.png',
      data: payload.data
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  } catch (error) {
    console.error('[firebase-messaging-sw.js] Push event error:', error);
  }
});
