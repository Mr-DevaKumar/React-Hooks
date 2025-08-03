import { useReducer, useState } from 'react';
import HookCard from '../components/HookCard';

interface CounterState {
  count: number;
}

type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

type TodoAction = 
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number };

const UseReducerExamples = () => {
  // Simple example
  const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      case 'RESET':
        return { count: 0 };
      default:
        throw new Error('Unhandled action type');
    }
  };

  const [counterState, counterDispatch] = useReducer(counterReducer, { count: 0 });

  // Real-world example
  const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          todos: [
            ...state.todos, 
            { 
              id: Date.now(), 
              text: action.text, 
              completed: false 
            }
          ],
        };
      case 'TOGGLE_TODO':
        return {
          todos: state.todos.map(todo =>
            todo.id === action.id 
              ? { ...todo, completed: !todo.completed } 
              : todo
          ),
        };
      case 'DELETE_TODO':
        return {
          todos: state.todos.filter(todo => todo.id !== action.id),
        };
      default:
        throw new Error('Unhandled action type');
    }
  };

  const [todoState, todoDispatch] = useReducer(todoReducer, { todos: [] });
  const [newTodo, setNewTodo] = useState<string>('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      todoDispatch({ type: 'ADD_TODO', text: newTodo });
      setNewTodo('');
    }
  };

  return (
    <div className="examples-container">
      <h2>useReducer Examples</h2>
      
      <HookCard
        title="Simple Counter"
        description="Counter using useReducer"
        code={`interface CounterState {
  count: number;
}

type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

const counterReducer = (
  state: CounterState, 
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      throw new Error('Unhandled action type');
  }
};

const [state, dispatch] = useReducer(counterReducer, { count: 0 });`}
        demo={
          <div className='button_group'>
            <p>Count: {counterState.count}</p>
            <button onClick={() => counterDispatch({ type: 'INCREMENT' })}>+</button>
            <button onClick={() => counterDispatch({ type: 'DECREMENT' })}>-</button>
            <button onClick={() => counterDispatch({ type: 'RESET' })}>Reset</button>
          </div>
        }
      />

      <HookCard
        title="Todo List"
        description="Todo list using useReducer"
        code={`interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

type TodoAction = 
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number };

const todoReducer = (
  state: TodoState, 
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...state.todos, 
          { id: Date.now(), text: action.text, completed: false }
        ],
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.id 
            ? { ...todo, completed: !todo.completed } 
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    default:
      throw new Error('Unhandled action type');
  }
};`}
        demo={
          <div className="todo-example">
            <div className='todo-group'>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter new todo"
            />
            <button onClick={handleAddTodo}>Add Todo</button></div>
            <ul>
              {todoState.todos.map(todo => (
                <li key={todo.id}>
                  <span
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => todoDispatch({ 
                      type: 'TOGGLE_TODO', 
                      id: todo.id 
                    })}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => todoDispatch({ 
                      type: 'DELETE_TODO', 
                      id: todo.id 
                    })}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        }
      />
    </div>
  );
};

export default UseReducerExamples;