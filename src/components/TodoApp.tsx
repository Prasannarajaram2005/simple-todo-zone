import React, { useState, useEffect } from 'react';
import { Todo, FilterType } from '@/types/todo';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          isEditing: false,
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      isEditing: false,
    };
    setTodos([newTodo, ...todos]);
    toast.success('Todo added successfully!');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
    const todo = todos.find(t => t.id === id);
    if (todo) {
      toast.success(todo.completed ? 'Todo marked as active!' : 'Todo completed!');
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Todo deleted successfully!');
  };

  const startEditTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, isEditing: true }
        : { ...todo, isEditing: false }
    ));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, text: newText, isEditing: false }
        : todo
    ));
    toast.success('Todo updated successfully!');
  };

  const cancelEditTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, isEditing: false }
        : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const todoCount = {
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Todo List
            </h1>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/60 hover:bg-white/80"
              onClick={() => window.location.href = '/login'}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
          <p className="text-gray-600 text-lg">
            Stay organized and productive
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
          <TodoInput onAddTodo={addTodo} />
          
          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            todoCount={todoCount}
          />

          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">
                  {filter === 'all' ? 'No todos yet!' : `No ${filter} todos!`}
                </div>
                <div className="text-gray-500">
                  {filter === 'all' 
                    ? 'Add a new todo to get started' 
                    : `Switch to "All" to see your other todos`
                  }
                </div>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  onStartEdit={startEditTodo}
                  onCancelEdit={cancelEditTodo}
                />
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200/50 text-center text-sm text-gray-500">
              {todoCount.completed} of {todoCount.all} tasks completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
