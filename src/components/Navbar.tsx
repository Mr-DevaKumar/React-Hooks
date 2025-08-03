// Navbar.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        React Hooks
      </Link>
      
      {/* Burger Icon - Only shows on mobile */}
      {isMobile && (
        <button 
          className="burger-icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className={`burger-line ${isOpen ? 'open' : ''}`}></div>
          <div className={`burger-line ${isOpen ? 'open' : ''}`}></div>
          <div className={`burger-line ${isOpen ? 'open' : ''}`}></div>
        </button>
      )}

      {/* Navigation Links - Shows differently based on screen size */}
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/use-state">useState</Link>
        <Link to="/use-effect">useEffect</Link>
        <Link to="/use-layout-effect">useLayoutEffect</Link>
        <Link to="/use-reducer">useReducer</Link>
        <Link to="/use-context">useContext</Link>
        <Link to="/use-ref">useRef</Link>
      </div>
    </nav>
  );
};

export default Navbar;