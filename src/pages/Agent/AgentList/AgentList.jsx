import React, { useState, useEffect } from 'react';
import { User, Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AgentList.css';

function AgentList() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedAgents = JSON.parse(localStorage.getItem('agents')) || [];

        if (savedAgents.length === 0) {
          // Default mock data if localStorage is empty
          const mockData = [
            {
              id: 1,
              name: 'John Doe',
              email: 'john.doe@example.com',
              phoneNumber: '+1234567890',
              cin: 'ABC123456',
              sectorId: '1',
              createdAt: new Date().toISOString()
            },
            {
              id: 2,
              name: 'Jane Smith',
              email: 'jane.smith@example.com',
              phoneNumber: '+0987654321',
              cin: 'XYZ789012',
              sectorId: '2',
              createdAt: new Date().toISOString()
            }
          ];
          localStorage.setItem('agents', JSON.stringify(mockData));
          setAgents(mockData);
        } else {
          setAgents(savedAgents);
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Confirm deletion of this agent?')) {
      const updatedAgents = agents.filter(agent => agent.id !== id);
      setAgents(updatedAgents);
      localStorage.setItem('agents', JSON.stringify(updatedAgents));
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock sector names for display (matching Agent.jsx)
  const sectors = {
    '1': 'North Wing',
    '2': 'South Wing'
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="agent-list-container">
      <div className="header">
        <h2>
          <User size={24} className="icon" />
          Agent Management
        </h2>
        <button onClick={() => navigate('/add-agent')} className="add-button">
          <Plus size={18} />
          Add Agent
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <table className="agent-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CIN</th>
            <th>Sector</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAgents.length > 0 ? (
            filteredAgents.map(agent => (
              <tr key={agent.id}>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.phoneNumber}</td>
                <td>{agent.cin}</td>
                <td>{sectors[agent.sectorId] || 'Unassigned'}</td>
                <td className="actions">
                  <button
                    onClick={() => navigate(`/update-agent/${agent.id}`)}
                    className="edit-btn"
                    title="Edit Agent"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="delete-btn"
                    title="Delete Agent"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No agents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AgentList;