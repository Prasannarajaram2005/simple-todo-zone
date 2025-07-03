
import React, { useState } from 'react';
import { Check, X, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onStartEdit: (id: string) => void;
  onCancelEdit: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit, onStartEdit, onCancelEdit }: TodoItemProps) => {
  const [editText, setEditText] = useState(todo.text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
    } else {
      onCancelEdit(todo.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      onCancelEdit(todo.id);
    }
  };

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
      
      {todo.isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 h-8 text-lg bg-white border-blue-300 focus:border-blue-500"
            autoFocus
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveEdit}
            className="w-8 h-8 text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <Check className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditText(todo.text);
              onCancelEdit(todo.id);
            }}
            className="w-8 h-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <>
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
            onClick={() => onStartEdit(todo.id)}
            className="flex-shrink-0 w-8 h-8 opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(todo.id)}
            className="flex-shrink-0 w-8 h-8 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
