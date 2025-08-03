import { useRef, useState, useEffect } from 'react';
import HookCard from '../components/HookCard';

const UseRefExamples = () => {
  // Example 1: DOM element reference (input focus)
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Example 2: Persistent timer reference
  const [timer, setTimer] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
  };

  // Example 3: Previous value tracking
  const [count, setCount] = useState<number>(0);
  const prevCountRef = useRef<number>();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  // Example 4: Content measurement
  const textRef = useRef<HTMLParagraphElement>(null);
  const [textDimensions, setTextDimensions] = useState({ 
    width: 0, 
    height: 0 
  });

  useEffect(() => {
    if (textRef.current) {
      const { width, height } = textRef.current.getBoundingClientRect();
      setTextDimensions({ width, height });
    }
  }, [inputValue]); // Re-measure when text changes

  return (
    <div className="examples-container">
      <h2>useRef Examples</h2>
      
      <HookCard
        title="1. DOM Element Reference"
        description="Accessing and manipulating DOM elements directly"
        code={`const inputRef = useRef<HTMLInputElement>(null);

const focusInput = () => {
  inputRef.current?.focus();
};

<input ref={inputRef} type="text" />`}
        demo={
          <div className="demo-group  ">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type something"
            />
            <div className="button_group">
              <button onClick={focusInput}>Focus Input</button>
            </div>
          </div>
        }
      />

      <HookCard
        title="2. Mutable Value Storage"
        description="Storing mutable values that persist between renders"
        code={`const intervalRef = useRef<number | null>(null);

// Start
intervalRef.current = setInterval(...);

// Cleanup
clearInterval(intervalRef.current);`}
        demo={
          <div className="demo-group">
            <p>Timer: {timer} seconds</p>
            <div className="button_group">
              <button onClick={startTimer}>Start</button>
              <button onClick={() => {
                if (intervalRef.current) {
                  window.clearInterval(intervalRef.current);
                  intervalRef.current = null;
                }
              }}>Stop</button>
              <button onClick={() => {
                setTimer(0);
              }}>Reset</button>
            </div>
          </div>
        }
      />

      <HookCard
        title="3. Previous Value Tracking"
        description="Tracking previous state values between renders"
        code={`const [count, setCount] = useState(0);
const prevCountRef = useRef<number>();

useEffect(() => {
  prevCountRef.current = count;
}, [count]);

// Usage:
<p>Previous: {prevCountRef.current}</p>`}
        demo={
          <div className="demo-group">
            <p>Current: {count}</p>
            <p>Previous: {prevCountRef.current}</p>
            <div className="button-group">
              <button onClick={() => setCount(c => c + 1)}>Increment</button>
            </div>
          </div>
        }
      />
{/* 
      <HookCard
        title="4. Content Measurement"
        description="Measuring DOM elements without triggering re-renders"
        code={`const textRef = useRef<HTMLParagraphElement>(null);
const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

useEffect(() => {
  if (textRef.current) {
    const rect = textRef.current.getBoundingClientRect();
    setDimensions({
      width: rect.width,
      height: rect.height
    });
  }
}, [content]);`}
        demo={
          <div className="demo-group">
            <p 
              ref={textRef}
              style={{ 
                border: '1px solid #ccc', 
                padding: '0.5rem',
                maxWidth: '300px'
              }}
            >
              {inputValue || "Resize or type to measure"}
            </p>
            <p>
              Width: {Math.round(textDimensions.width)}px | 
              Height: {Math.round(textDimensions.height)}px
            </p>
          </div>
        }
      /> */}
    </div>
  );
};

export default UseRefExamples;