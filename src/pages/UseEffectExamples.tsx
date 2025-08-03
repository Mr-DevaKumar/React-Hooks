import { useState, useEffect } from 'react';
import HookCard from '../components/HookCard';

const UseEffectExamples = () => {
  // Example 1: Data fetching with cleanup
  const [userData, setUserData] = useState<{name: string, email: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount
    
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const data = await response.json();
        if (isMounted) {
          setUserData({
            name: data.name,
            email: data.email
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [userId]);

  // Example 2: Event listener with dependency
  const [keyPressed, setKeyPressed] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKeyPressed(e.key);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Example 3: Timer with cleanup
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    
    if (isTimerRunning) {
      intervalId = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTimerRunning]);

  return (
    <div className="examples-container">
      <h2>useEffect Examples</h2>
      
      <HookCard
        title="Data Fetching with Cleanup"
        description="Fetching data and preventing memory leaks"
        code={`const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);
const [userId, setUserId] = useState(1);

useEffect(() => {
  let isMounted = true;
  
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        \`https://jsonplaceholder.typicode.com/users/\${userId}\`
      );
      const data = await response.json();
      if (isMounted) {
        setUserData(data);
        setLoading(false);
      }
    } catch (error) {
      if (isMounted) setLoading(false);
    }
  };

  fetchUser();

  return () => {
    isMounted = false;
  };
}, [userId]);`}
        demo={
          <div>
            <div className="button-group">
              <button onClick={() => setUserId(prev => Math.max(1, prev - 1))}>
                Previous User
              </button>
              <span>User ID: {userId}</span>
              <button onClick={() => setUserId(prev => prev + 1)}>
                Next User
              </button>
            </div>
            {loading ? (
              <p>Loading user data...</p>
            ) : userData ? (
              <div>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
              </div>
            ) : (
              <p>No user data available</p>
            )}
          </div>
        }
      />

      <HookCard
        title="Keyboard Event Listener"
        description="Listening to global events with cleanup"
        code={`const [keyPressed, setKeyPressed] = useState(null);

useEffect(() => {
  const handleKeyPress = (e) => {
    setKeyPressed(e.key);
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => {
    window.removeEventListener('keydown', handleKeyPress);
  };
}, []);`}
        demo={
          <div>
            <p>Press any key to see it detected</p>
            {keyPressed && (
              <p>
                Last key pressed: <strong>{keyPressed}</strong>
              </p>
            )}
            <p className="hint-text">
              (Click here first to focus, then press keys)
            </p>
          </div>
        }
      />

      <HookCard
        title="Timer with Cleanup"
        description="Managing intervals and preventing memory leaks"
        code={`const [timer, setTimer] = useState(0);
const [isTimerRunning, setIsTimerRunning] = useState(false);

useEffect(() => {
  let intervalId;
  
  if (isTimerRunning) {
    intervalId = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  }

  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}, [isTimerRunning]);`}
        demo={
          <div>
            <p>Timer: {timer} seconds</p>
            <div className="button_group">
              <button onClick={() => setIsTimerRunning(!isTimerRunning)}>
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button onClick={() => {
                setIsTimerRunning(false);
                setTimer(0);
              }}>
                Reset
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default UseEffectExamples;