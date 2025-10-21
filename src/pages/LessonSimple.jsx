import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';

const LessonSimple = () => {
  const { classId, chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching lesson...', { classId, chapterId, lessonId });
    
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/lessons/class/${classId}/chapter/${chapterId}/lesson/${lessonId}`
        );
        console.log('Lesson data:', response.data);
        setLessonData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError(err.response?.data?.message || 'Không thể tải bài học');
      } finally {
        setLoading(false);
      }
    };

    if (classId && chapterId && lessonId) {
      fetchLesson();
    }
  }, [classId, chapterId, lessonId]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#f0f9ff' }}>
        <h2>⏳ Đang tải bài học...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#fee' }}>
        <h2 style={{ color: 'red' }}>⚠️ Có lỗi xảy ra</h2>
        <p>{error}</p>
        <div style={{ marginTop: '12px', color: '#444' }}>
          <div>Khả năng cao là dữ liệu bài học đang trống.</div>
          <div>Hãy chạy lại lệnh seed để tạo dữ liệu mẫu:</div>
          <pre style={{ background: '#111', color: '#fff', padding: '10px', borderRadius: '6px', display: 'inline-block' }}>npm run seed</pre>
          <div style={{ marginTop: '6px' }}>Sau đó F5 trang và thử lại.</div>
        </div>
        <button style={{ marginTop: '16px' }} onClick={() => navigate('/dashboard')}>Quay về Dashboard</button>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>📚 Không tìm thấy bài học</h2>
        <button onClick={() => navigate('/dashboard')}>Quay về Dashboard</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/dashboard')}
        style={{ 
          padding: '10px 20px', 
          marginBottom: '20px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ← Quay lại Dashboard
      </button>

      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{lessonData.title}</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>{lessonData.description}</p>

      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '20px' }}>📖 Lý thuyết</h2>
        <div dangerouslySetInnerHTML={{ __html: lessonData.theory }} />
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '30px' }}>
        <h2 style={{ marginBottom: '20px' }}>🎮 Trò chơi</h2>
        <p style={{ color: '#666' }}>
          Bài học này có <strong>{lessonData.game?.quizzes?.length || 0}</strong> câu hỏi
        </p>
        
        {lessonData.game?.quizzes?.map((quiz, index) => (
          <div key={index} style={{ 
            padding: '15px', 
            background: '#f9fafb', 
            borderRadius: '8px', 
            marginTop: '15px',
             borderLeft: '4px solid #3b82f6',
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center'
          }}>
             <div>
               <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>
                 Câu {index + 1}: {quiz.question}
               </h3>
               <p style={{ color: '#888', fontSize: '14px' }}>
                 Loại: <strong>{quiz.type}</strong> | Điểm: <strong>{quiz.points}pts</strong>
               </p>
             </div>
             <a 
               href={`/gameplay/${classId}/${chapterId}/${lessonId}`}
               style={{ 
                 padding: '10px 20px', 
                 background: '#10b981', 
                 color: 'white', 
                 textDecoration: 'none', 
                 borderRadius: '6px',
                 fontWeight: 'bold',
                 whiteSpace: 'nowrap',
                 transition: 'background 0.3s'
               }}
               onMouseOver={(e) => e.target.style.background = '#059669'}
               onMouseOut={(e) => e.target.style.background = '#10b981'}
             >
               🎮 Chơi ngay
             </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonSimple;
