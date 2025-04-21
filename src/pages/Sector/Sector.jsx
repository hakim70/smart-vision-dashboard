import React, { useState } from 'react';
import { MapPin, Camera } from 'lucide-react';
import './Sector.css';

function Sector() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    cameras: [],
    newCameraIp: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sector created:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCamera = () => {
    if (!formData.newCameraIp) return;
    
    const newCamera = {
      id: Date.now().toString(),
      ipAddress: formData.newCameraIp
    };

    setFormData(prev => ({
      ...prev,
      cameras: [...prev.cameras, newCamera],
      newCameraIp: ''
    }));
  };

  const handleRemoveCamera = (id) => {
    setFormData(prev => ({
      ...prev,
      cameras: prev.cameras.filter(camera => camera.id !== id)
    }));
  };

  return (
    <div className="form-container">
      <div className="form-icon">
        <MapPin size={32} />
      </div>
      <h2>Create New Sector</h2>
      <p>Add a new sector and assign cameras</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Sector Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., North Wing"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Building A, Floor 2"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the sector and its coverage area"
            rows={3}
            required
          />
        </div>

        <div className="form-group">
          <label>IP Cameras</label>
          <div className="camera-input">
            <input
              type="text"
              name="newCameraIp"
              value={formData.newCameraIp}
              onChange={handleChange}
              placeholder="Enter IP address (e.g., 192.168.1.100)"
            />
            <button type="button" onClick={handleAddCamera} className="add-camera-button">
              <Camera size={20} />
            </button>
          </div>

          <div className="camera-list">
            {formData.cameras.map(camera => (
              <div key={camera.id} className="camera-item">
                <div className="camera-info">
                  <Camera size={16} />
                  <span>{camera.ipAddress}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCamera(camera.id)}
                  className="remove-camera-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Create Sector
        </button>
      </form>
    </div>
  );
}

export default Sector;