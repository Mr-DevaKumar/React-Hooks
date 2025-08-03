import { useState, type ChangeEvent } from 'react';
import HookCard from '../components/HookCard';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const UseStateExamples = () => {
  // Simple example
  const [count, setCount] = useState<number>(0);

  // Real-world example
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="examples-container">
      <h2>useState Examples</h2>
      <div className='example-container-problems'>
      <HookCard
        title="Simple Counter"
        description="A basic counter using useState"
        code={`const [count, setCount] = useState<number>(0);

<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>`}
        demo={
          <div className='button_group'>
            <button onClick={() => setCount(count + 1)}>
              Count: {count}
            </button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
        }
      />

      <HookCard
        title="Form Handling"
        description="A real-world form handling example"
        code={`interface FormData {
  username: string;
  email: string;
  password: string;
}

const [formData, setFormData] = useState<FormData>({
  username: '',
  email: '',
  password: '',
});

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};`}
        demo={
          <form className="form-example">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="form-data">
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          </form>
        }
      />
      </div>
    </div>
  );
};

export default UseStateExamples;