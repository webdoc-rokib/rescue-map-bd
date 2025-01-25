import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Map from './components/Map';
import AddResource from './pages/AddResource';
import VolunteerRegister from './pages/VolunteerRegister';
import EditResource from './pages/EditResource';
import Footer from './components/Footer';
import Loading from './components/Loading';

export default function App() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authentication configuration
  const authConfig = {
    headers: {
      Authorization: 'Basic ' + btoa('admin:password123') // Basic authentication
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          'http://localhost:5000/api/resources',
          authConfig // Add auth config here
        );
        setResources(res.data);
        setError(null);
      } catch (err) {
        setError('Failed to load resources. Please try again later.');
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResources();
  }, []); // Empty dependency array for initial load

  return (
    <Router>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Navbar />
        <Banner />
        
        <main style={{ 
          flex: 1,
          padding: '2rem 0',
          background: '#f8f9fa' 
        }}>
          <Routes>
            <Route 
              path="/" 
              element={
                loading ? (
                  <Loading message="Loading flood data..." />
                ) : error ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#dc3545' }}>
                    {error}
                  </div>
                ) : (
                  <Map 
                    resources={resources} 
                    setResources={setResources}
                    authConfig={authConfig}
                  />
                )
              } 
            />
            
            <Route 
              path="/add-resource" 
              element={<AddResource authConfig={authConfig} />} 
            />
            <Route 
              path="/volunteer" 
              element={<VolunteerRegister authConfig={authConfig} />} 
            />
            <Route 
              path="/edit-resource" 
              element={<EditResource authConfig={authConfig} />} 
            />
          </Routes>
        </main>

        <Footer />
        
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}