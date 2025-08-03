import { Link } from 'react-router-dom';
import '../../styles.css';

const hooks = [
  { name: 'useState', path: '/use-state', description: 'Manage state in functional components' },
  { name: 'useEffect', path: '/use-effect', description: 'Perform side effects in functional components' },
  { name: 'useLayoutEffect', path: '/use-layout-effect', description: 'Similar to useEffect but fires synchronously after all DOM mutations' },
  { name: 'useReducer', path: '/use-reducer', description: 'Alternative to useState for complex state logic' },
  { name: 'useContext', path: '/use-context', description: 'Access context in functional components' },
  { name: 'useRef', path: '/use-ref', description: 'Create mutable ref objects' },
];

const Home = () => {
  return (
    <div className="home">
      <h1>React Hooks</h1>
      <p>Select a hook to and see simple demo</p>
      <div className="hooks-grid">
        {hooks.map((hook) => (
          <Link to={hook.path} key={hook.name} className="hook-card">
            <h3>{hook.name}</h3>
            <p>{hook.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;