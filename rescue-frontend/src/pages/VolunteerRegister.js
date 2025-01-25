import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VolunteerRegister() {
  const [form, setForm] = useState({ name: '', email: '', skills: '', availability: 'part-time' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/volunteers', form);
      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="container">
      <h2>Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <textarea
          placeholder="Skills (e.g., Medical Training, Boat Operation)"
          onChange={e => setForm({ ...form, skills: e.target.value })}
        />
        <select onChange={e => setForm({ ...form, availability: e.target.value })}>
          <option value="part-time">Part-Time</option>
          <option value="full-time">Full-Time</option>
          <option value="emergency">Emergency Response</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}