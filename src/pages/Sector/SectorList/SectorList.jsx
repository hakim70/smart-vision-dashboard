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
        <button onClick={() => navigate('/Sector')}>
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