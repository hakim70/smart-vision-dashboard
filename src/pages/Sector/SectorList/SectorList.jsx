// import React, { useState, useEffect } from 'react';
// import { Edit, Trash2, MapPin, Plus, Camera } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import './SectorList.css';

// function SectorList() {
//   const navigate = useNavigate();
//   const [sectors, setSectors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Récupérer les secteurs depuis le localStorage
//         const savedSectors = JSON.parse(localStorage.getItem('sectors')) || [];
        
//         // Si aucun secteur dans le localStorage, utiliser les données mock
//         if (savedSectors.length === 0) {
//           await new Promise(resolve => setTimeout(resolve, 800));
//           const mockData = [
//             { 
//               id: 1, 
//               name: 'North Wing', 
//               location: 'Building A, Floor 1', 
//               description: 'Main entrance area',
//               cameraCount: 3,
//               cameras: [
//                 { id: 1, ipAddress: '192.168.1.101' },
//                 { id: 2, ipAddress: '192.168.1.102' },
//                 { id: 3, ipAddress: '192.168.1.103' }
//               ]
//             },
//             { 
//               id: 2, 
//               name: 'South Wing', 
//               location: 'Building B, Floor 2', 
//               description: 'Parking and storage area',
//               cameraCount: 2,
//               cameras: [
//                 { id: 4, ipAddress: '192.168.1.104' },
//                 { id: 5, ipAddress: '192.168.1.105' }
//               ]
//             },
//           ];
//           setSectors(mockData);
//           localStorage.setItem('sectors', JSON.stringify(mockData));
//         } else {
//           setSectors(savedSectors);
//         }
//       } catch (error) {
//         console.error('Error fetching sectors:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this sector?')) {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         const updatedSectors = sectors.filter(sector => sector.id !== id);
//         setSectors(updatedSectors);
//         localStorage.setItem('sectors', JSON.stringify(updatedSectors));
//         alert('Sector deleted successfully');
//       } catch (error) {
//         console.error('Error deleting sector:', error);
//         alert('Failed to delete sector');
//       }
//     }
//   };

//   const filteredSectors = sectors.filter(sector =>
//     sector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     sector.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading">Loading sectors...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="sector-container">
//       <div className="sector-header">
//         <h2>
//           <MapPin size={24} className="icon" />
//           Sectors Management
//         </h2>
//         <button 
//           onClick={() => navigate('/add-sector')} 
//           className="add-button"
//         >
//           <Plus size={18} className="button-icon" />
//           Add Sector
//         </button>
//       </div>

//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search sectors..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="table-container">
//         <table className="sector-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Location</th>
//               <th>Description</th>
//               <th>Cameras</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSectors.length > 0 ? (
//               filteredSectors.map((sector) => (
//                 <tr key={sector.id}>
//                   <td>{sector.name}</td>
//                   <td>{sector.location}</td>
//                   <td>{sector.description}</td>
//                   <td>
//                     <div className="cameras-count">
//                       <Camera size={16} />
//                       <span>{sector.cameraCount || sector.cameras?.length || 0} cameras</span>
//                     </div>
//                   </td>
//                   <td className="actions">
//                     <button
//                       onClick={() => navigate(`/sectorupdate/${sector.id}`)}
//                     //   onClick={() => navigate(`/sectorupdate`)}
//                       className="edit-btn"
//                     >
//                       <Edit size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(sector.id)}
//                       className="delete-btn"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="no-data">
//                   No sectors found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default SectorList;



import React, { useState, useEffect } from 'react';
import { Edit, Trash2, MapPin, Plus, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SectorList.css';

function SectorList() {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedSectors = JSON.parse(localStorage.getItem('sectors')) || [];
        
        if (savedSectors.length === 0) {
          // Données par défaut si vide
          const mockData = [
            { 
              id: 1, 
              name: 'North Wing', 
              location: 'Building A, Floor 1', 
              description: 'Main entrance area',
              cameras: [
                { id: 1, ipAddress: '192.168.1.101' },
                { id: 2, ipAddress: '192.168.1.102' },
                { id: 3, ipAddress: '192.168.1.103' }
              ]
            }
          ];
          localStorage.setItem('sectors', JSON.stringify(mockData));
          setSectors(mockData);
        } else {
          setSectors(savedSectors);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Confirm deletion?')) {
      const updated = sectors.filter(s => s.id !== id);
      setSectors(updated);
      localStorage.setItem('sectors', JSON.stringify(updated));
    }
  };

  const filteredSectors = sectors.filter(sector =>
    sector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sector.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="sector-list-container">
      <div className="header">
        <h2><MapPin /> Sector Management</h2>
        <button onClick={() => navigate('/add-sector')}>
          <Plus /> Add Sector
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Cameras</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSectors.map(sector => (
            <tr key={sector.id}>
              <td>{sector.name}</td>
              <td>{sector.location}</td>
              <td>
                <Camera /> {sector.cameras?.length || 0}
              </td>
              <td>
                <button onClick={() => navigate(`/update-sector/${sector.id}`)}>
                  <Edit />
                </button>
                <button onClick={() => handleDelete(sector.id)}>
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SectorList;