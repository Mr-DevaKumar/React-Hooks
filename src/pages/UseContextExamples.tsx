import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import HookCard from '../components/HookCard';

// Theme Context Types
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Apply theme to the entire document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemedButton = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('ThemedButton must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;
  
  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle-btn"
    >
      Toggle Theme ({theme})
    </button>
  );
};

// User Context Types
interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProfile = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('UserProfile must be used within a UserProvider');
  }

  const { user, logout } = context;
  
  if (!user) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div className="user-profile">
      <h3>User Profile</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const LoginForm = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('LoginForm must be used within a UserProvider');
  }

  const { login } = context;
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
    setFormData({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h3>Login</h3>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

const UseContextExamples = () => {
  return (
    <div className="examples-container">
      <h2>useContext Examples</h2>
      
      <HookCard
        title="Theme Toggler"
        description="Global theme toggler using useContext"
        code={`// Apply to entire document
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);

// Usage in components
const { theme, toggleTheme } = useContext(ThemeContext);`}
        demo={
          <ThemeProvider>
            <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <ThemedButton />
              <p>Current theme applies to the entire page!</p>
            </div>
          </ThemeProvider>
        }
      />

      <HookCard
        title="User Authentication"
        description="User auth flow using useContext"
        code={`// Context creation
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Usage in components
const { user, login, logout } = useContext(UserContext);`}
        demo={
          <UserProvider>
            <div className="auth-example" style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <UserProfile />
              <LoginForm />
            </div>
          </UserProvider>
        }
      />
    </div>
  );
};

export default UseContextExamples;