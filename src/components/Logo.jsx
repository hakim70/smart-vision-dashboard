import React from 'react';
import logo from '../assets/BT.png';

function Logo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Pour que le marginLeft fonctionne correctement
        height: '6rem',
        padding: '1rem 0',
      }}
    >
      <img
        src={logo}
        alt="Banque de Tunisie Logo"
        style={{
          width: '70px',
          height: 'auto',
          objectFit: 'contain',
          marginLeft: '40px',
        }}
      />
    </div>
  );
}

export default Logo;
