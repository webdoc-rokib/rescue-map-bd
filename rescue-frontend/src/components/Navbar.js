import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav style={{ 
      padding: '1rem 2rem',
      background: '#007BFF',  // Brand blue background
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        <Link 
          to="/" 
          style={{ 
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1.1rem',
            padding: '8px 12px',
            borderRadius: '4px',
            transition: 'all 0.3s',
            ':hover': {
              backgroundColor: 'rgba(255,255,255,0.15)'
            }
          }}
        >
          Home
        </Link>
        <Link
          to="/add-resource"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1.1rem',
            padding: '8px 12px',
            borderRadius: '4px',
            transition: 'all 0.3s',
            ':hover': {
              backgroundColor: 'rgba(255,255,255,0.15)'
            }
          }}
        >
          Add Resource
        </Link>
        <Link
          to="/volunteer"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1.1rem',
            padding: '8px 12px',
            borderRadius: '4px',
            transition: 'all 0.3s',
            ':hover': {
              backgroundColor: 'rgba(255,255,255,0.15)'
            }
          }}
        >
          Volunteer
        </Link>
      </div>
    </nav>
  );
}