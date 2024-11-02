export interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

export type Todos = Todo[];