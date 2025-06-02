import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ course: '', message: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const res = await API.get('/feedback');
      setFeedbacks(res.data);
    } catch {
      setError('Failed to fetch feedbacks');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/feedback', formData);
      setFeedbacks([res.data, ...feedbacks]);
      setFormData({ course: '', message: '' });
    } catch {
      setError('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    setError('');
    try {
      await API.delete(`/feedback/${id}`);
      setFeedbacks(feedbacks.filter(fb => fb._id !== id));
    } catch {
      setError('Failed to delete feedback');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Feedback</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit} className="feedback-form">
        <input
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={onChange}
          required
          maxLength={100}
        />
        <textarea
          name="message"
          placeholder="Your feedback message"
          value={formData.message}
          onChange={onChange}
          required
          maxLength={500}
          rows={4}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      <h3>Your Feedbacks</h3>
      {feedbacks.length === 0 ? (
        <p>No feedbacks submitted yet.</p>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map(fb => (
            <li key={fb._id} className="feedback-item">
              <div>
                <strong>{fb.course}</strong>
                <p>{fb.message}</p>
              </div>
              <button className="delete-btn" onClick={() => onDelete(fb._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Feedback;
