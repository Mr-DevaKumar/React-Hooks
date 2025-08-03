import { useState, useLayoutEffect, useRef } from 'react';
import HookCard from '../components/HookCard';

const UseLayoutEffectExamples = () => {
  // Example 1: Preventing layout flicker during animations
  const [isExpanded, setIsExpanded] = useState(false);
  const expandableRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (expandableRef.current) {
      const { width, height } = expandableRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [isExpanded]);

  // Example 2: Synchronous DOM measurements for responsive layout
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  useLayoutEffect(() => {
    const calculateColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setColumns(Math.max(1, Math.floor(containerWidth / 200)));
      }
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, []);

  // Example 3: Scroll position preservation
  const listRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  useLayoutEffect(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight } = listRef.current;
      
      return () => {
        if (listRef.current) {
          const newScrollTop = scrollTop + (listRef.current.scrollHeight - scrollHeight);
          listRef.current.scrollTop = newScrollTop;
        }
      };
    }
  }, [items]);

  return (
    <div className="examples-container">
      <h2>useLayoutEffect Examples</h2>
      
      <HookCard
        title="Animation Without Flicker"
        description="Measuring elements before DOM update to prevent visual glitches"
        code={`const [isExpanded, setIsExpanded] = useState(false);
const ref = useRef<HTMLDivElement>(null);
const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

useLayoutEffect(() => {
  if (ref.current) {
    const { width, height } = ref.current.getBoundingClientRect();
    setDimensions({ width, height });
  }
}, [isExpanded]);`}
        demo={
          <div>
            <div className="button-group">
              <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <div
              ref={expandableRef}
              style={{
                width: isExpanded ? '300px' : '150px',
                height: isExpanded ? '200px' : '100px',
                backgroundColor: '#646cff',
                transition: 'all 0.3s ease',
                marginTop: '1rem',
                color: 'white',
                padding: '1rem',
              }}
            >
              <p>Current width: {dimensions.width.toFixed(0)}px</p>
              <p>Current height: {dimensions.height.toFixed(0)}px</p>
            </div>
          </div>
        }
      />

      <HookCard
        title="Responsive Column Layout"
        description="Synchronous layout measurements for responsive designs"
        code={`const containerRef = useRef<HTMLDivElement>(null);
const [columns, setColumns] = useState(1);

useLayoutEffect(() => {
  const calculateColumns = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      setColumns(Math.max(1, Math.floor(containerWidth / 200)));
    }
  };

  calculateColumns();
  window.addEventListener('resize', calculateColumns);
  return () => window.removeEventListener('resize', calculateColumns);
}, []);`}
        demo={
          <div ref={containerRef} style={{ width: '100%', border: '1px solid #ccc', padding: '1rem' }}>
            <h4>Resize the window to see columns change</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{
                  backgroundColor: '#535bf2',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '4px'
                }}>
                  Item {i + 1}
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1rem' }}>Current columns: {columns}</p>
          </div>
        }
      />

      <HookCard
        title="Scroll Position Preservation"
        description="Maintaining scroll position during DOM updates"
        code={`const listRef = useRef<HTMLDivElement>(null);
const [items, setItems] = useState(initialItems);

useLayoutEffect(() => {
  if (listRef.current) {
    const { scrollTop, scrollHeight } = listRef.current;
    
    return () => {
      if (listRef.current) {
        const newScrollTop = scrollTop + (listRef.current.scrollHeight - scrollHeight);
        listRef.current.scrollTop = newScrollTop;
      }
    };
  }
}, [items]);`}
        demo={
          <div>
            <div className="button-group">
              <button onClick={() => setItems(prev => [...prev, `Item ${prev.length + 1}`])}>
                Add Item
              </button>
            </div>
            <div
              ref={listRef}
              style={{
                height: '200px',
                overflowY: 'auto',
                border: '1px solid #ccc',
                padding: '0.5rem',
                marginTop: '1rem'
              }}
            >
              {items.map((item, i) => (
                <div key={i} style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default UseLayoutEffectExamples;