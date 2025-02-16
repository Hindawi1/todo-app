import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: string;
  time: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() && date && time) {
      const newTodo: Todo = {
        id: Date.now(),
        text: input,
        completed: false,
        date,
        time,
      };
      setTodos([...todos, newTodo]);
      setInput('');
      setDate('');
      setTime('');
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <div className="todo-box">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            className="todo-input"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="todo-input"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            Add
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-details">
                <span
                  onClick={() => toggleComplete(todo.id)}
                  className="todo-text"
                >
                  {todo.text}
                </span>
                <span className="todo-date-time">
                  {todo.date} at {todo.time}
                </span>
              </div>
              <div className="todo-actions">
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className="done-button"
                >
                  {todo.completed ? 'Undo' : 'Done'}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;