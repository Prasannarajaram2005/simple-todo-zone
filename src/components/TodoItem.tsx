
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="group flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white/70">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all duration-200 ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
            : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
        }`}
      >
        {todo.completed && <Check className="w-4 h-4" />}
      </Button>
      
      <span
        className={`flex-1 text-lg transition-all duration-200 ${
          todo.completed
            ? 'text-gray-500 line-through'
            : 'text-gray-800'
        }`}
      >
        {todo.text}
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 w-8 h-8 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
