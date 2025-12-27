import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect logic based on user state
    if (user && user.programs && user.programs.length > 0) {
      // User has enrolled programs - redirect to the active program
      const activeProgram = user.programs.find(p => p.isActive);
      if (activeProgram) {
        navigate(`/program/${activeProgram.programId}`);
      } else {
        // No active program, go to selection
        navigate('/');
      }
    } else {
      // No programs enrolled, redirect to program selection
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Đang chuyển hướng...</p>
      </div>
    </div>
  );
};

export default Home;
