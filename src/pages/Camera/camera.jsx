import React, { useState } from 'react';
import { Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Camera.css';

function AddCamera() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    ipAddress: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate IP address
      const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipRegex.test(formData.ipAddress)) {
        alert('Please enter a valid IP address (e.g., 192.168.1.100)');
        setLoading(false);
        return;
      }

      const newCamera = {
        id: Date.now().toString(),
        name: formData.name,
        ipAddress: formData.ipAddress
      };

      // Get existing cameras from localStorage
      const existingCameras = JSON.parse(localStorage.getItem('cameras')) || [];
      
      // Add new camera
      const updatedCameras = [...existingCameras, newCamera];
      
      // Update localStorage
      localStorage.setItem('cameras', JSON.stringify(updatedCameras));

      alert('Camera added successfully!');
      navigate('/cameras'); // Adjust this route as needed
    } catch (error) {
      console.error('Error adding camera:', error);
      alert('Failed to add camera');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="camera-container">
      <div className="camera-header">
        <h2>
          <Camera size={24} className="icon" />
          Add New Camera
        </h2>
        <button 
          onClick={() => navigate('/cameras')} 
          className="back-button"
        >
          <ArrowLeft size={18} className="button-icon" />
          Back to List
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Camera Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Entrance Camera"
                required
                minLength={3}
                maxLength={50}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ipAddress">IP Address *</label>
              <input
                type="text"
                id="ipAddress"
                name="ipAddress"
                value={formData.ipAddress}
                onChange={handleChange}
                placeholder="e.g., 192.168.1.100"
                required
                pattern="^(\d{1,3}\.){3}\d{1,3}$"
                title="Format: XXX.XXX.XXX.XXX"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading || !formData.name || !formData.ipAddress}
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <Save size={18} className="button-icon" />
                  Add Camera
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCamera;



