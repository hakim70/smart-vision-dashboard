// import React, { useState, useEffect } from 'react';
// import { MapPin, Camera, Save, ArrowLeft } from 'lucide-react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './SectorUpdate.css';

// function UpdateSector() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     description: '',
//     cameras: [],
//     newCameraIp: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadSectorData = () => {
//       try {
//         // 1. Vérifier que l'ID est valide
//         if (!id || isNaN(id)) {
//           throw new Error('Invalid sector ID');
//         }

//         // 2. Récupérer les données depuis localStorage
//         const sectorsData = localStorage.getItem('sectors');
//         if (!sectorsData) {
//           throw new Error('No sectors data found');
//         }

//         // 3. Parser et trouver le secteur
//         const parsedSectors = JSON.parse(sectorsData);
//         const sectorToEdit = parsedSectors.find(s => s.id === parseInt(id));

//         if (!sectorToEdit) {
//           throw new Error(`Sector with ID ${id} not found`);
//         }

//         // 4. Mettre à jour le state avec les données trouvées
//         setFormData({
//           name: sectorToEdit.name || '',
//           location: sectorToEdit.location || '',
//           description: sectorToEdit.description || '',
//           cameras: sectorToEdit.cameras || [],
//           newCameraIp: ''
//         });

//       } catch (err) {
//         console.error('Failed to load sector:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadSectorData();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdateLoading(true);
    
//     try {
//       // 1. Valider les données du formulaire
//       if (!formData.name || !formData.location) {
//         throw new Error('Name and location are required');
//       }

//       // 2. Récupérer les secteurs existants
//       const existingSectors = JSON.parse(localStorage.getItem('sectors')) || [];
      
//       // 3. Mettre à jour le secteur
//       const updatedSectors = existingSectors.map(sector => {
//         if (sector.id === parseInt(id)) {
//           return {
//             ...sector,
//             name: formData.name,
//             location: formData.location,
//             description: formData.description,
//             cameras: formData.cameras,
//             cameraCount: formData.cameras.length
//           };
//         }
//         return sector;
//       });

//       // 4. Sauvegarder
//       localStorage.setItem('sectors', JSON.stringify(updatedSectors));

//       // 5. Rediriger avec confirmation
//       alert('Sector updated successfully!');
//       navigate('/sectors');

//     } catch (err) {
//       console.error('Update failed:', err);
//       setError(err.message);
//     } finally {
//       setUpdateLoading(false);
//     }
//   };

//   // Fonctions pour gérer les caméras (inchangées)
//   const handleAddCamera = () => {
//     if (!formData.newCameraIp) return;
    
//     const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
//     if (!ipRegex.test(formData.newCameraIp)) {
//       setError('Please enter a valid IP address (e.g., 192.168.1.100)');
//       return;
//     }

//     const newCamera = {
//       id: Date.now().toString(),
//       ipAddress: formData.newCameraIp
//     };

//     setFormData(prev => ({
//       ...prev,
//       cameras: [...prev.cameras, newCamera],
//       newCameraIp: '',
//       error: null
//     }));
//   };

//   const handleRemoveCamera = (id) => {
//     setFormData(prev => ({
//       ...prev,
//       cameras: prev.cameras.filter(camera => camera.id !== id)
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading">Loading sector data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <div className="error-message">{error}</div>
//         <button 
//           onClick={() => navigate('/sectors')}
//           className="back-button"
//         >
//           <ArrowLeft size={18} />
//           Return to Sector List
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="sector-container">
//       {/* ... (le reste du JSX reste inchangé) ... */}
//     </div>
//   );
// }

// export default UpdateSector;
import React, { useState, useEffect } from 'react';
import { MapPin, Camera, Save, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import './SectorUpdate.css';

function UpdateSector() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    cameras: [],
    newCameraIp: ''
  });

  useEffect(() => {
    const sectors = JSON.parse(localStorage.getItem('sectors')) || [];
    const sector = sectors.find(s => s.id === parseInt(id));
    
    if (sector) {
      setFormData({
        name: sector.name,
        location: sector.location,
        description: sector.description || '',
        cameras: sector.cameras || [],
        newCameraIp: ''
      });
    } else {
      navigate('/sectors');
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const sectors = JSON.parse(localStorage.getItem('sectors')) || [];
    const updated = sectors.map(s => 
      s.id === parseInt(id) ? { 
        ...s, 
        ...formData,
        cameraCount: formData.cameras.length 
      } : s
    );
    
    localStorage.setItem('sectors', JSON.stringify(updated));
    navigate('/sectors');
  };

  const handleAddCamera = () => {
    if (!formData.newCameraIp) return;
    
    const newCamera = {
      id: Date.now(),
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
      cameras: prev.cameras.filter(c => c.id !== id)
    }));
  };

  return (
    <div className="sector-form">
      <h2><MapPin /> Update Sector</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="camera-section">
          <label>Cameras</label>
          <div className="camera-input">
            <input
              value={formData.newCameraIp}
              onChange={(e) => setFormData({...formData, newCameraIp: e.target.value})}
              placeholder="IP Address"
            />
            <button type="button" onClick={handleAddCamera}>
              <Camera /> Add
            </button>
          </div>

          <div className="camera-list">
            {formData.cameras.map(camera => (
              <div key={camera.id} className="camera-item">
                <span>{camera.ipAddress}</span>
                <button type="button" onClick={() => handleRemoveCamera(camera.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/sectors')}>
            <ArrowLeft /> Cancel
          </button>
          <button type="submit">
            <Save /> Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSector;