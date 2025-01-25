import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditResource() {
  const { state } = useLocation();
  const [form, setForm] = useState(state);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/resources/${form.id}`, form);
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Edit Resource</h2>
      {/* Reuse AddResource form structure but with existing values */}
      <form onSubmit={handleSubmit}>
        {/* All input fields same as AddResource.js but with defaultValue */}
        <input
          type="text"
          placeholder="Location Name"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        {/* Include all other fields from AddResource */}
        
        <button type="submit">Update Resource</button>
      </form>
    </div>
  );
}