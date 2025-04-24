import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users ,Map ,Cctv } from 'lucide-react';
import './Sidebar.css';
import Logo from '../Logo';


function NavLink({ to, icon: Icon, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      <Icon size={20} />
      <span>{children}</span>
    </Link>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo/>
      </div>

      <nav className="nav-menu">
        <NavLink to="/" icon={LayoutDashboard}>Dashboard</NavLink>
        
        <NavLink to="/supervisor" icon={Users}>Supervisor</NavLink>
       

        <NavLink to="/sector" icon={Map}>Sector</NavLink>
        <NavLink to="/sectors" icon={Map}>SectorList</NavLink>

        <NavLink to="/agent" icon={Cctv}>Agent</NavLink>
        <NavLink to="/agents" icon={Cctv}>AgentList</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
