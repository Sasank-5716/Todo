import { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-500 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">My Todo List</h1>
          <p className="text-indigo-100">What's on your mind today?</p>
        </div>
        
        <form onSubmit={addTodo} className="p-6">
          <div className="flex items-center rounded-lg overflow-hidden shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 border-0 focus:ring-2 focus:ring-indigo-500"
              placeholder="Add a new task..."
              aria-label="Add a new todo item"
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white p-3 hover:bg-indigo-600 transition-colors"
              aria-label="Add todo"
            >
              <FiPlus className="h-5 w-5" />
            </button>
          </div>
        </form>

        <ul className="divide-y divide-gray-200">
          {todos.length === 0 ? (
            <li className="p-6 text-center text-gray-500">
              No tasks yet. Add one above!
            </li>
          ) : (
            todos.map((todo, index) => (
              <li key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleTodo(index)}
                      className={`h-6 w-6 rounded-full flex items-center justify-center ${todo.completed ? 'bg-green-500 text-white' : 'border-2 border-gray-300'}`}
                      aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {todo.completed && <FiCheck className="h-4 w-4" />}
                    </button>
                    <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    aria-label="Delete todo"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {todos.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500 text-center">
            {todos.filter(t => t.completed).length} of {todos.length} tasks completed
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;