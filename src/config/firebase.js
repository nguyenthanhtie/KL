import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
// NOTE: consider moving these values to environment variables for production
const firebaseConfig = {
  apiKey: "AIzaSyAogvxsayMucg8hSHB2xQmUIw92fltevmY",
  authDomain: "leanrmore-8547f.firebaseapp.com",
  projectId: "leanrmore-8547f",
  // storageBucket should follow the pattern <projectId>.appspot.com
  storageBucket: "leanrmore-8547f.appspot.com",
  messagingSenderId: "468458404277",
  appId: "1:468458404277:web:7b2a570caf8a46a397c1fc",
  measurementId: "G-ZBYZVRLK2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

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
