import React, { useState, useEffect } from 'react';
import { UserPlus, Save, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './AgentUpdate.css';

function AgentUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    cin: '',
    password: '',
    sectorId: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Mock sectors data (same as Agent.jsx)
  const sectors = [
    { id: '1', name: 'North Wing' },
    { id: '2', name: 'South Wing' }
  ];

  useEffect(() => {
    const fetchAgent = () => {
      try {
        const agents = JSON.parse(localStorage.getItem('agents')) || [];
        const agent = agents.find(agent => agent.id === parseInt(id));
        if (!agent) {
          throw new Error('Agent not found');
        }
        setFormData({
          name: agent.name,
          email: agent.email,
          phoneNumber: agent.phoneNumber,
          cin: agent.cin,
          password: agent.password, // Note: In production, handle passwords securely
          sectorId: agent.sectorId
        });
      } catch (error) {
        console.error('Error fetching agent:', error);
        alert('Failed to load agent data');
        navigate('/agents');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAgent();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get existing agents from localStorage
      const existingAgents = JSON.parse(localStorage.getItem('agents')) || [];

      // Check for duplicate email (excluding current agent)
      if (existingAgents.some(agent => agent.email === formData.email && agent.id !== parseInt(id))) {
        throw new Error('An agent with this email already exists');
      }

      // Update agent
      const updatedAgents = existingAgents.map(agent =>
        agent.id === parseInt(id)
          ? { ...agent, ...formData, updatedAt: new Date().toISOString() }
          : agent
      );
      localStorage.setItem('agents', JSON.stringify(updatedAgents));

      console.log('Agent updated:', formData);
      alert('Agent updated successfully!');
      navigate('/agents');
    } catch (error) {
      console.error('Error updating agent:', error);
      alert(error.message || 'Failed to update agent');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (initialLoading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="agent-update-container">
      <div className="agent-header">
        <h2>
          <UserPlus size={24} className="icon" />
          Update Agent
        </h2>
        <button 
          onClick={() => navigate('/agents')} 
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
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter agent's full name"
                required
                minLength={3}
                maxLength={50}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="agent@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1234567890"
                required
                pattern="^\+?[0-9\s\-]+$"
                title="Enter a valid phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cin">CIN *</label>
              <input
                type="text"
                id="cin"
                name="cin"
                value={formData.cin}
                onChange={handleChange}
                placeholder="National ID Number"
                required
                minLength={5}
                maxLength={20}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sectorId">Assign to Sector *</label>
              <select
                id="sectorId"
                name="sectorId"
                value={formData.sectorId}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select a sector</option>
                {sectors.map(sector => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading || !formData.name || !formData.email || !formData.phoneNumber || !formData.cin || !formData.password || !formData.sectorId}
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <Save size={18} className="button-icon" />
                  Update Agent
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgentUpdate;