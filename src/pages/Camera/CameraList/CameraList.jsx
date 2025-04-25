import React, { useState, useEffect } from 'react';
import { Camera, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CameraList.css';

function CameraList() {
  const navigate = useNavigate();
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedCameras = JSON.parse(localStorage.getItem('cameras')) || [];

        if (savedCameras.length === 0) {
          // Default mock data if localStorage is empty
          const mockData = [
            {
              id: '1',
              name: 'Entrance Camera',
              ipAddress: '192.168.1.100',
              createdAt: new Date().toISOString()
            },
            {
              id: '2',
              name: 'Lobby Camera',
              ipAddress: '192.168.1.101',
              createdAt: new Date().toISOString()
            },
            {
              id: '3',
              name: 'Parking Camera',
              ipAddress: '192.168.1.102',
              createdAt: new Date().toISOString()
            }
          ];

          localStorage.setItem('cameras', JSON.stringify(mockData));
          setCameras(mockData);
        } else {
          setCameras(savedCameras);
        }
      } catch (error) {
        console.error('Error fetching cameras:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Confirm deletion of this camera?')) {
      const updatedCameras = cameras.filter(camera => camera.id !== id);
      setCameras(updatedCameras);
      localStorage.setItem('cameras', JSON.stringify(updatedCameras));
    }
  };

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current items for pagination
  const indexOfLastCamera = currentPage * itemsPerPage;
  const indexOfFirstCamera = indexOfLastCamera - itemsPerPage;
  const currentCameras = filteredCameras.slice(indexOfFirstCamera, indexOfLastCamera);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredCameras.length / itemsPerPage)));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="camera-list-container">
      <div className="header">
        <h2>
          <Camera size={24} className="icon" />
          Camera Management
        </h2>
        <button onClick={() => navigate('/camera')} className="add-button">
          <Plus size={18} />
          Add Camera
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or IP address..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <table className="camera-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IP Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCameras.length > 0 ? (
            currentCameras.map(camera => (
              <tr key={camera.id}>
                <td>{camera.name}</td>
                <td>{camera.ipAddress}</td>
                <td>
                  <span className="status-badge online">Online</span>
                </td>
                <td className="actions">
                  <button
                    onClick={() => navigate(`/update-camera/${camera.id}`)}
                    className="edit-btn"
                    title="Edit Camera"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(camera.id)}
                    className="delete-btn"
                    title="Delete Camera"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No cameras found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredCameras.length > 0 && (
        <div className="pagination">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: Math.ceil(filteredCameras.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === Math.ceil(filteredCameras.length / itemsPerPage)}
            className="pagination-button"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default CameraList;