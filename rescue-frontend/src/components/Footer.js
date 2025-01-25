export default function Footer() {
    return (
      <footer style={{
        background: '#007BFF',
        color: 'white',
        padding: '3rem 1rem',
        marginTop: 'auto',
        borderTop: '4px solid #20c997'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {/* About Section */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>About RescueMap</h3>
            <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
              A community-driven platform for coordinating flood relief efforts across Bangladesh.
            </p>
          </div>
  
          {/* Contact Section */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Contact Us</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>📞 Emergency: 999</li>
              <li style={{ marginBottom: '0.5rem' }}>📧 Email: support@rescuemapbd.org</li>
              <li>🏢 Office: Dhaka, Bangladesh</li>
            </ul>
          </div>
  
          {/* Links Section */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#privacy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#terms" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#partners" style={{ color: 'white', textDecoration: 'none' }}>Partnerships</a>
            </div>
          </div>
        </div>
  
        {/* Copyright */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          opacity: 0.8,
          fontSize: '0.9rem'
        }}>
          © {new Date().getFullYear()} RescueMap BD. All rights reserved.
        </div>
      </footer>
    );
  }