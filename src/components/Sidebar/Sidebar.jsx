// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { LayoutDashboard, Users ,Map ,Cctv } from 'lucide-react';
// import './Sidebar.css';
// import Logo from '../Logo';


// function NavLink({ to, icon: Icon, children }) {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   return (
//     <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
//       <Icon size={20} />
//       <span>{children}</span>
//     </Link>
//   );
// }

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <Logo/>
//       </div>

//       <nav className="nav-menu">

//         <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
        
//         <NavLink to="/supervisor" icon={Users}>Supervisor</NavLink>
       

//         <NavLink to="/sector" icon={Map}>Sector</NavLink>
//         <NavLink to="/sectors" icon={Map}>SectorList</NavLink>

//         <NavLink to="/agent" icon={Cctv}>Agent</NavLink>
//         <NavLink to="/agents" icon={Cctv}>AgentList</NavLink>

//         <NavLink to="/camera" icon={Cctv}>Camera</NavLink>
//       </nav>
//     </div>
//   );
// }

// export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Map, Cctv } from 'lucide-react';
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
  // userInfo mel localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const role = userInfo?.role; // n7otou ? bel precaution ken userInfo null

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo />
      </div>

      <nav className="nav-menu">
        {/* yodhhor dashboard w supervisor ken l'admin */}
        {role === 'admin' && (
          <>
            <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
            <NavLink to="/supervisor" icon={Users}>Supervisor</NavLink>
          </>
        )}

        {/* tnajjem tzid role !== admin w taffichi baad  */}
        {role == 'supervisor' && (
          <>
            <NavLink to="/sector" icon={Map}>Sector</NavLink>
            <NavLink to="/sectors" icon={Map}>SectorList</NavLink>
            <NavLink to="/agent" icon={Cctv}>Agent</NavLink>
            <NavLink to="/agents" icon={Cctv}>AgentList</NavLink>
            <NavLink to="/camera" icon={Cctv}>Camera</NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;

