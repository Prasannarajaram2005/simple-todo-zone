
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  isEditing?: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
