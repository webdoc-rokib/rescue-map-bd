import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddResource({ authConfig }) {
  const [form, setForm] = useState({ 
    name: '', 
    lat: '', 
    lng: '', 
    needs: '', 
    severity: 'medium',
    description: '', 
    contact_info: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsSubmitting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm({
          ...form,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6)
        });
        setIsSubmitting(false);
      },
      (error) => {
        toast.error(`Location Error: ${error.message}`);
        setIsSubmitting(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(
        'http://localhost:5000/api/resources', 
        form,
        authConfig
      );
      
      toast.success('Resource added successfully!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      toast.error(`Submission Failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable input styles
  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '1rem',
    ':focus': {
      borderColor: '#80bdff',
      outline: 'none',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,0.25)'
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
        Add Resource Requirement
      </h2>
      
      <form onSubmit={handleSubmit} style={{ 
        background: '#f8f9fa',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Location Name */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Location Name
          </label>
          <input
            type="text"
            placeholder="Enter location name"
            required
            style={inputStyle}
            onChange={e => setForm({ ...form, name: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        {/* Coordinates Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Coordinates
          </label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              required
              style={{ ...inputStyle, flex: 1 }}
              value={form.lat}
              onChange={e => setForm({ ...form, lat: e.target.value })}
              disabled={isSubmitting}
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              required
              style={{ ...inputStyle, flex: 1 }}
              value={form.lng}
              onChange={e => setForm({ ...form, lng: e.target.value })}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={handleGeolocation}
              style={{
                padding: '8px 12px',
                background: isSubmitting ? '#cccccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              disabled={isSubmitting}
            >
              <span style={{ fontSize: '1.2rem' }}>📍</span>
              {isSubmitting ? 'Locating...' : 'Auto-Locate'}
            </button>
          </div>
        </div>

        {/* Resource Needs */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Required Resources
          </label>
          <input
            type="text"
            placeholder="Comma separated list (e.g., Water, Medicine, Tents)"
            required
            style={inputStyle}
            onChange={e => setForm({ ...form, needs: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        {/* Severity Level */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Severity Level
          </label>
          <select 
            style={{ ...inputStyle, width: '100%' }}
            onChange={e => setForm({ ...form, severity: e.target.value })}
            value={form.severity}
            disabled={isSubmitting}
          >
            <option value="high">High Severity</option>
            <option value="medium">Medium Severity</option>
            <option value="low">Low Severity</option>
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Detailed Description
          </label>
          <textarea
            placeholder="Describe the situation and specific needs"
            required
            style={{ ...inputStyle, height: '100px' }}
            onChange={e => setForm({ ...form, description: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        {/* Contact Information */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Contact Information
          </label>
          <input
            type="text"
            placeholder="Phone number or email address"
            required
            style={inputStyle}
            onChange={e => setForm({ ...form, contact_info: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: isSubmitting ? '#6c757d' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.3s'
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Resource Request'}
        </button>
      </form>
    </div>
  );
}