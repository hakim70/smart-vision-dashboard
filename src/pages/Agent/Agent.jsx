import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import './Agent.css';

function Agent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    cin: '',
    password: '',
    sectorId: ''
  });

  // Mock sectors data
  const sectors = [
    { id: '1', name: 'North Wing' },
    { id: '2', name: 'South Wing' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Agent created:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container">
      <div className="form-icon">
        <UserPlus size={32} />
      </div>
      <h2>Add New Agent</h2>
      <p>Create an agent account and assign to a sector</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter agent's full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1234567890"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cin">CIN</label>
          <input
            type="text"
            id="cin"
            name="cin"
            value={formData.cin}
            onChange={handleChange}
            placeholder="National ID Number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sectorId">Assign to Sector</label>
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

        <button type="submit" className="submit-button">
          Create Agent
        </button>
      </form>
    </div>
  );
}

export default Agent;