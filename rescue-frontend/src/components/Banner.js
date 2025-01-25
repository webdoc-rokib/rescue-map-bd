export default function Banner() {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #007BFF 0%, #20c997 100%)',
        color: 'white',
        padding: '3rem 1rem',
        textAlign: 'center',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          RescueMap BD
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          maxWidth: '800px', 
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Bangladesh Flood Response System - Connecting Communities with Critical Resources
        </p>
      </div>
    );
  }