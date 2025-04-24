// import React, { useState } from 'react';
// import { MapPin, Camera, Save, Factory } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import './Sector.css';

// function AddSector() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     description: '',
//     cameras: [],
//     newCameraIp: ''
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       // Simuler un délai d'appel API
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Créer un nouvel objet secteur avec un ID unique
//       const newSector = {
//         id: Date.now(), // Utilisation du timestamp comme ID unique
//         name: formData.name,
//         location: formData.location,
//         description: formData.description,
//         cameras: formData.cameras,
//         cameraCount: formData.cameras.length
//       };

//       // Récupérer les secteurs existants depuis le localStorage
//       const existingSectors = JSON.parse(localStorage.getItem('sectors')) || [];
      
//       // Ajouter le nouveau secteur
//       const updatedSectors = [...existingSectors, newSector];
      
//       // Mettre à jour le localStorage
//       localStorage.setItem('sectors', JSON.stringify(updatedSectors));

//       console.log('Sector created:', newSector);
//       alert('Sector created successfully!');
//       navigate('/sectors');
//     } catch (error) {
//       console.error('Error creating sector:', error);
//       alert('Failed to create sector');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddCamera = () => {
//     if (!formData.newCameraIp) return;
    
//     // Vérifier si l'adresse IP est valide (validation simple)
//     const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
//     if (!ipRegex.test(formData.newCameraIp)) {
//       alert('Please enter a valid IP address (e.g., 192.168.1.100)');
//       return;
//     }

//     const newCamera = {
//       id: Date.now().toString(),
//       ipAddress: formData.newCameraIp
//     };

//     setFormData(prev => ({
//       ...prev,
//       cameras: [...prev.cameras, newCamera],
//       newCameraIp: ''
//     }));
//   };

//   const handleRemoveCamera = (id) => {
//     setFormData(prev => ({
//       ...prev,
//       cameras: prev.cameras.filter(camera => camera.id !== id)
//     }));
//   };

//   return (
//     <div className="sector-container">
//       <div className="sector-header">
//         <h2>
//           <MapPin size={24} className="icon" />
//           Add New Sector
//         </h2>
//         <button 
//           onClick={() => navigate('/sectors')} 
//           className="back-button"
//         >
//           <Factory size={18} className="button-icon" />
//           Back to List
//         </button>
//       </div>

//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="name">Sector Name *</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="e.g., North Wing"
//                 required
//                 minLength={3}
//                 maxLength={50}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="location">Location *</label>
//               <input
//                 type="text"
//                 id="location"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="e.g., Building A, Floor 2"
//                 required
//                 minLength={5}
//                 maxLength={100}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Description *</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Describe the sector and its coverage area"
//                 rows={3}
//                 required
//                 minLength={10}
//                 maxLength={500}
//               />
//             </div>

//             <div className="form-group full-width">
//               <label>IP Cameras</label>
//               <div className="camera-input">
//                 <input
//                   type="text"
//                   name="newCameraIp"
//                   value={formData.newCameraIp}
//                   onChange={handleChange}
//                   placeholder="Enter IP address (e.g., 192.168.1.100)"
//                   pattern="^(\d{1,3}\.){3}\d{1,3}$"
//                   title="Format: XXX.XXX.XXX.XXX"
//                 />
//                 <button 
//                   type="button" 
//                   onClick={handleAddCamera} 
//                   className="add-camera-button"
//                   disabled={!formData.newCameraIp}
//                 >
//                   <Camera size={18} />
//                   Add Camera
//                 </button>
//               </div>

//               {formData.cameras.length > 0 && (
//                 <div className="camera-list">
//                   <h4>Added Cameras ({formData.cameras.length})</h4>
//                   {formData.cameras.map(camera => (
//                     <div key={camera.id} className="camera-item">
//                       <div className="camera-info">
//                         <Camera size={16} />
//                         <span>{camera.ipAddress}</span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveCamera(camera.id)}
//                         className="remove-camera-button"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="form-actions">
//             <button 
//               type="submit" 
//               className="submit-button"
//               disabled={loading || !formData.name || !formData.location || !formData.description}
//             >
//               {loading ? (
//                 'Processing...'
//               ) : (
//                 <>
//                   <Save size={18} className="button-icon" />
//                   Create Sector
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddSector;
import React, { useState, useEffect } from 'react';
import { MapPin, Camera, Save, Factory } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Sector.css';

function AddSector() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    selectedCameraIds: []
  });
  const [availableCameras, setAvailableCameras] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load cameras from localStorage
    const cameras = JSON.parse(localStorage.getItem('cameras')) || [];
    setAvailableCameras(cameras);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get selected cameras
      const selectedCameras = availableCameras.filter(cam => 
        formData.selectedCameraIds.includes(cam.id)
      );

      // Create new sector object
      const newSector = {
        id: Date.now(),
        name: formData.name,
        location: formData.location,
        description: formData.description,
        cameras: selectedCameras,
        cameraCount: selectedCameras.length
      };

      // Get existing sectors from localStorage
      const existingSectors = JSON.parse(localStorage.getItem('sectors')) || [];
      
      // Add new sector
      const updatedSectors = [...existingSectors, newSector];
      
      // Update localStorage
      localStorage.setItem('sectors', JSON.stringify(updatedSectors));

      console.log('Sector created:', newSector);
      alert('Sector created successfully!');
      navigate('/sectors');
    } catch (error) {
      console.error('Error creating sector:', error);
      alert('Failed to create sector');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCameraToggle = (cameraId) => {
    setFormData(prev => ({
      ...prev,
      selectedCameraIds: prev.selectedCameraIds.includes(cameraId)
        ? prev.selectedCameraIds.filter(id => id !== cameraId)
        : [...prev.selectedCameraIds, cameraId]
    }));
  };

  return (
    <div className="sector-container">
      <div className="sector-header">
        <h2>
          <MapPin size={24} className="icon" />
          Add New Sector
        </h2>
        <button 
          onClick={() => navigate('/sectors')} 
          className="back-button"
        >
          <Factory size={18} className="button-icon" />
          Back to List
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Sector Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., North Wing"
                required
                minLength={3}
                maxLength={50}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Building A, Floor 2"
                required
                minLength={5}
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the sector and its coverage area"
                rows={3}
                required
                minLength={10}
                maxLength={500}
              />
            </div>

            <div className="form-group full-width">
              <label>Select Cameras</label>
              {availableCameras.length === 0 ? (
                <p>No cameras available. Please add cameras first.</p>
              ) : (
                <div className="camera-list">
                  <h4>Available Cameras ({availableCameras.length})</h4>
                  {availableCameras.map(camera => (
                    <div key={camera.id} className="camera-item">
                      <div className="camera-info">
                        <input
                          type="checkbox"
                          checked={formData.selectedCameraIds.includes(camera.id)}
                          onChange={() => handleCameraToggle(camera.id)}
                        />
                        <Camera size={16} />
                        <span>{camera.name} ({camera.ipAddress})</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading || !formData.name || !formData.location || !formData.description}
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <Save size={18} className="button-icon" />
                  Create Sector
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSector;