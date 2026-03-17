import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (user.role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (user.role === 'teacher' && user.teacherStatus === 'approved') {
      navigate('/teacher', { replace: true });
    } else if (user.role === 'teacher' && user.teacherStatus === 'pending') {
      navigate('/', { replace: true }); // Stay on landing page/info
    } else {
      // Student logic
      if (user.programs && user.programs.length > 0) {
        const activeProgram = user.programs.find(p => p.isActive) || user.programs[0];
        if (activeProgram) {
          navigate(`/program/${activeProgram.programId}`, { replace: true });
        } else {
          navigate('/student/classes', { replace: true });
        }
      } else {
        navigate('/student/classes', { replace: true });
      }
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
