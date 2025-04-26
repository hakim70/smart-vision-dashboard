// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// function Login() {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Liste des utilisateurs simulée
//   const users = [
//     { username: 'admin', password: 'admin123', role: 'admin' },
//     { username: 'supervisor', password: 'super123', role: 'supervisor' },
//     { username: 'agent', password: 'agent123', role: 'agent' }
//   ];

//   useEffect(() => {
//     const userInfo = localStorage.getItem('userInfo');
//     if (userInfo) {
//       const user = JSON.parse(userInfo);
//       redirectToRolePage(user.role);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     if (!credentials.username || !credentials.password) {
//       setError('Veuillez remplir tous les champs');
//       return;
//     }

//     const user = users.find(
//       u => u.username === credentials.username && u.password === credentials.password
//     );

//     if (user) {
//       const userInfo = {
//         username: user.username,
//         role: user.role,
//         isAuthenticated: true
//       };

//       localStorage.setItem('userInfo', JSON.stringify(userInfo));
//       redirectToRolePage(user.role);
//     } else {
//       setError('Nom d\'utilisateur ou mot de passe incorrect');
//     }
//   };

//   const redirectToRolePage = (role) => {
//     if (role === 'admin') {
//       navigate('/dashboard');
//     } else if (role === 'supervisor') {
//       navigate('/sector');
//     } else if (role === 'agent') {
//       navigate('/agent');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Connexion</h2>
//         {error && <div className="error-message">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Nom d'utilisateur</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={credentials.username}
//               onChange={handleChange}
//               placeholder="Entrez votre nom d'utilisateur"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Mot de passe</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               placeholder="Entrez votre mot de passe"
//             />
//           </div>
//           <button type="submit" className="btn-login">Se connecter</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Liste des utilisateurs simulée
  const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'supervisor', password: 'super123', role: 'supervisor' },
    { username: 'agent', password: 'agent123', role: 'agent' }
  ];

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      redirectToRolePage(user.role);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!credentials.username || !credentials.password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    // Simulation d'une requête réseau
    setTimeout(() => {
      const user = users.find(
        u => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        const userInfo = {
          username: user.username,
          role: user.role,
          isAuthenticated: true
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        redirectToRolePage(user.role);
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
        setLoading(false);
      }
    }, 800); // Simulation de délai réseau
  };

  const redirectToRolePage = (role) => {
    if (role === 'admin') {
      navigate('/dashboard');
    } else if (role === 'supervisor') {
      navigate('/sector');
    } else if (role === 'agent') {
      navigate('/agent');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2>Connexion</h2>
            <p className="login-subtitle">Veuillez vous connecter pour continuer</p>
          </div>
          
          {error && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <div className="input-wrapper">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Entrez votre nom d'utilisateur"
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="label-wrapper">
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="input-wrapper">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Entrez votre mot de passe"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`btn-login ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : 'Se connecter'}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Login;