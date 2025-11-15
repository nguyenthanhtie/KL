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
    if (!firebaseUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      let dbUser = null;
      try {
        // First, try to get the user profile from your DB
        const response = await api.get(`/users/profile/${firebaseUser.uid}`);
        dbUser = response.data;
      } catch (error) {
        // If user is not found (404), create them in your DB
        if (error.response?.status === 404) {
          console.log('User not found in DB, creating profile...');
          try {
            const createResponse = await api.post('/users/profile', {
              email: firebaseUser.email,
              firebaseUid: firebaseUser.uid,
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
              username: firebaseUser.email?.split('@')[0]
            });
            dbUser = createResponse.data;
            console.log('User profile created for:', firebaseUser.email);
          } catch (createError) {
            console.error('Failed to create user profile:', createError);
            // Fallback: continue with Firebase user only
            setUser(firebaseUser);
            setLoading(false);
            return;
          }
        } else {
          // For other errors, log and continue with Firebase user
          console.error('Error fetching user profile:', error);
          setUser(firebaseUser);
          setLoading(false);
          return;
        }
      }
      
      // Merge Firebase auth data with your DB data
      setUser({ ...firebaseUser, ...dbUser });

    } catch (error) {
      console.error('Error syncing user with database:', error);
      // Fallback to just Firebase user data if DB sync fails
      setUser(firebaseUser); 
    } finally {
      // Always set loading to false after the process is complete
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      syncUserWithDatabase(user);
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
    setUser,
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
