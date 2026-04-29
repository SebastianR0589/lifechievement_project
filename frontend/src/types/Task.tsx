export interface Task {
  id: number;
  description: string;
  points: number;
  done: number
  status: boolean;
  archived: boolean;
  repeatable: boolean;
}