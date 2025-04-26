import React, { useState } from 'react';
import { Search, Bell, Settings, LogOut } from 'lucide-react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [notifications] = useState([
    { id: 1, text: 'New agent registered' },
    { id: 2, text: 'Sector update required' },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const navigate = useNavigate(); // ➔ tu dois ajouter ça
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/'); // ➔ rediriger directement, pas besoin de setIsLoggedIn etc ici
  };

  return (
    <header className="navbar">
      <h1>Smart save vision</h1>
      
      <div className="navbar-actions">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>

        <div className="navbar-buttons">
          <div className="notification-container">
            <button
              className="icon-button"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>
            
            {showNotifications && (
              <div className="dropdown-menu">
                <h3>Notifications</h3>
                {notifications.map(notification => (
                  <div key={notification.id} className="dropdown-item">
                    {notification.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="settings-container">
            <button
              className="icon-button"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={20} />
            </button>
            
            {showSettings && (
              <div className="dropdown-menu">
                <h3>Settings</h3>
                <div className="dropdown-item">Profile</div>
                <div className="dropdown-item">Preferences</div>
                <div className="dropdown-item">Security</div>
              </div>
            )}
          </div>

          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
