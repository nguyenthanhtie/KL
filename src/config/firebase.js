import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiGT3aKjuKRjzW2ZG4nnPnhSZ0V-msU6o",
  authDomain: "doan-79e5f.firebaseapp.com",
  projectId: "doan-79e5f",
  storageBucket: "doan-79e5f.firebasestorage.app",
  messagingSenderId: "673061549064",
  appId: "1:673061549064:web:ca6851c82c379aa0020dbd",
  measurementId: "G-ZGFNYB9VHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google Provider for Authentication
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account' // Force account selection every time
});

// Initialize Analytics safely (avoid errors during SSR or when unsupported)
let analytics = null;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (err) {
  // Analytics failed to initialize (running in non-browser environment or missing support)
  // keep analytics as null and continue
}

export { analytics };

export default app;
