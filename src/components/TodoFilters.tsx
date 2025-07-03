
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilterType } from '@/types/todo';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCount: {
    all: number;
    active: number;
    completed: number;
  };
}

const TodoFilters = ({ currentFilter, onFilterChange, todoCount }: TodoFiltersProps) => {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: todoCount.all },
    { key: 'active', label: 'Active', count: todoCount.active },
    { key: 'completed', label: 'Completed', count: todoCount.completed },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map(({ key, label, count }) => (
        <Button
          key={key}
          variant={currentFilter === key ? 'default' : 'ghost'}
          onClick={() => onFilterChange(key)}
          className={`transition-all duration-200 ${
            currentFilter === key
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
          }`}
        >
          {label} ({count})
        </Button>
      ))}
    </div>
  );
};

export default TodoFilters;
