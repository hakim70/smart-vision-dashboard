import { useState, useEffect } from 'react';
import './Login.css';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Liste des utilisateurs simulée
  // Dans une application réelle, ces informations viendraient du backend
  const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'supervisor', password: 'super123', role: 'supervisor' },
    { username: 'agent', password: 'agent123', role: 'agent' }
  ];

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Vérification simple des champs
    if (!credentials.username || !credentials.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    // Vérifier les identifiants avec la liste des utilisateurs
    const user = users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (user) {
      // Stocker les informations d'utilisateur dans localStorage
      const userInfo = {
        username: user.username,
        role: user.role,
        isAuthenticated: true
      };
      
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoggedIn(true);
      setUserRole(user.role);
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserRole('');
    setCredentials({ username: '', password: '' });
  };

  // Fonction pour obtenir un message selon le rôle
  const getRoleSpecificContent = (role) => {
    switch (role) {
      case 'admin':
        return {
          title: 'Interface Administrateur',
          message: 'Vous avez accès à toutes les fonctionnalités du système.',
          color: '#4a90e2'
        };
      case 'supervisor':
        return {
          title: 'Interface Superviseur',
          message: 'Vous pouvez gérer les agents et surveiller les opérations.',
          color: '#27ae60'
        };
      case 'agent':
        return {
          title: 'Interface Agent',
          message: 'Vous pouvez accéder aux fonctionnalités de base du système.',
          color: '#f39c12'
        };
      default:
        return {
          title: 'Bienvenue',
          message: 'Vous êtes connecté.',
          color: '#95a5a6'
        };
    }
  };

  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const roleContent = getRoleSpecificContent(user.role);
    
    return (
      <div className="login-container">
        <div className="login-card" style={{ borderTop: `4px solid ${roleContent.color}` }}>
          <h2>{roleContent.title}</h2>
          <div className="role-badge" style={{ backgroundColor: roleContent.color }}>
            {user.role.toUpperCase()}
          </div>
          <p className="welcome-message">Bienvenue, <strong>{user.username}</strong>!</p>
          <p>{roleContent.message}</p>
          <div className="action-buttons">
            <button 
              className="btn-dashboard" 
              onClick={() => alert(`Redirection vers le tableau de bord ${user.role}`)}
            >
              Accéder au tableau de bord
            </button>
            <button className="btn-logout" onClick={handleLogout}>Se déconnecter</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Connexion</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button type="submit" className="btn-login">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;