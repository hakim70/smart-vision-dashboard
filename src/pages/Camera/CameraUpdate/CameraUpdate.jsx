import React, { useState, useEffect } from 'react';
import { Camera, Save, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './CameraUpdate.css';

function CameraUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    ipAddress: '',
  });

  useEffect(() => {
    const fetchCamera = () => {
      try {
        const savedCameras = JSON.parse(localStorage.getItem('cameras')) || [];
        const camera = savedCameras.find(cam => cam.id === id);
        
        if (camera) {
          setFormData({
            name: camera.name,
            ipAddress: camera.ipAddress,
          });
        } else {
          setError('Camera not found');
        }
      } catch (error) {
        console.error('Error fetching camera:', error);
        setError('Error loading camera data');
      } finally {
        setLoading(false);
      }
    };

    fetchCamera();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateIPAddress = (ip) => {
    // Simple IP validation regex
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Camera name is required');
      return;
    }
    
    if (!formData.ipAddress.trim()) {
      setError('IP address is required');
      return;
    }
    
    if (!validateIPAddress(formData.ipAddress)) {
      setError('Please enter a valid IP address');
      return;
    }

    try {
      const savedCameras = JSON.parse(localStorage.getItem('cameras')) || [];
      const updatedCameras = savedCameras.map(camera => {
        if (camera.id === id) {
          return {
            ...camera,
            name: formData.name,
            ipAddress: formData.ipAddress,
            updatedAt: new Date().toISOString()
          };
        }
        return camera;
      });

      localStorage.setItem('cameras', JSON.stringify(updatedCameras));
      navigate('/'); // Redirect to camera list
    } catch (error) {
      console.error('Error updating camera:', error);
      setError('Failed to update camera');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="camera-update-container">
      <div className="header">
        <h2>
          <Camera size={24} className="icon" />
          Update Camera
        </h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="camera-form">
        <div className="form-group">
          <label htmlFor="name">Camera Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter camera name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ipAddress">IP Address</label>
          <input
            type="text"
            id="ipAddress"
            name="ipAddress"
            value={formData.ipAddress}
            onChange={handleChange}
            placeholder="Enter IP address (e.g. 192.168.1.100)"
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="cancel-button"
          >
            <X size={16} />
            Cancel
          </button>
          <button type="submit" className="save-button">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default CameraUpdate;