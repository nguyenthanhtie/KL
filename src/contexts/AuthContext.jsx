import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync Firebase user with database
  const syncUserWithDatabase = async (firebaseUser) => {
    if (!firebaseUser) return;

    try {
      // Check if user exists in database
      const response = await api.get(`/users/profile/${firebaseUser.uid}`);
      
      // User exists, no need to create
      console.log('User profile found:', response.data.username);
    } catch (error) {
      // User doesn't exist, create profile
      if (error.response?.status === 404) {
        try {
          await api.post('/users/profile', {
            email: firebaseUser.email,
            firebaseUid: firebaseUser.uid,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
            username: firebaseUser.email?.split('@')[0]
          });
          console.log('User profile created for:', firebaseUser.email);
        } catch (createError) {
          console.error('Error creating user profile:', createError);
        }
      } else {
        console.error('Error checking user profile:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      // Sync user with database when authenticated
      if (user) {
        await syncUserWithDatabase(user);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
