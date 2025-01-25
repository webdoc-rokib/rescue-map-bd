import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// Custom marker icons
const severityIcons = {
  high: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  }),
  medium: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  }),
  low: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  })
};

// Fix default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function LocationButton() {
  const map = useMap();
  const navigate = useNavigate();

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo([latitude, longitude], 13);
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup('Your current location')
          .openPopup();
      },
      (error) => {
        alert(`Error getting location: ${error.message}`);
      }
    );
  };

  return (
    <button 
      onClick={handleGeolocation}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        padding: '8px 15px',
        background: '#ffffff',
        border: '2px solid #007bff',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}
    >
      📍 Find My Location
    </button>
  );
}

export default function Map({ resources, setResources }) {
  const [map, setMap] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      await axios.delete(`http://localhost:5000/api/resources/${id}`);
      setResources(resources.filter(resource => resource.id !== id));
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <MapContainer
        center={[23.6850, 90.3563]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <strong style="color: var(--primary-blue)">RescueMap BD</strong>'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
        
        {map && <LocationButton />}
        
        {resources.map((resource) => (
          <Marker 
            key={resource.id} 
            position={[resource.lat, resource.lng]}
            icon={severityIcons[resource.severity] || severityIcons.medium}
          >
            <Popup>
              <div style={{ minWidth: '250px' }}>
                <h3 style={{ margin: '0 0 10px', color: '#007bff' }}>{resource.name}</h3>
                <p><strong>Severity:</strong> <span style={{ 
                  color: resource.severity === 'high' ? '#dc3545' : 
                         resource.severity === 'medium' ? '#ffc107' : '#28a745',
                  fontWeight: 'bold'
                }}>{resource.severity}</span></p>
                <p><strong>Needs:</strong> {resource.needs}</p>
                {resource.description && <p><strong>Details:</strong> {resource.description}</p>}
                {resource.contact_info && <p><strong>Contact:</strong> {resource.contact_info}</p>}
                <p style={{ fontSize: '0.8em', color: '#666', marginTop: '10px' }}>
                  Updated: {new Date(resource.created_at).toLocaleDateString()}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginTop: '15px',
                  borderTop: '1px solid #eee',
                  paddingTop: '10px'
                }}>
                  <button
                    onClick={() => navigate('/edit-resource', { state: resource })}
                    style={{
                      flex: 1,
                      background: '#ffc107',
                      color: 'black',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    style={{
                      flex: 1,
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}