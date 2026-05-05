import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TasksPage from './TasksPage';
import * as taskApi from '../api/taskApi'; 
jest.mock('../api/taskApi');

describe('TasksPage Integration', () => {
  const mockOnUpdate = jest.fn();

  const fakeTasks = [
    { id: 1, description: 'Do homework', points: 50, status: false, archived: false, repeatable: false, done: 0 },
    { id: 2, description: 'Test React', points: 100, status: false, archived: false, repeatable: true, done: 0 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads tasks', async () => {
    (taskApi.getTasks as jest.Mock).mockResolvedValue(fakeTasks);

    render(<TasksPage onUpdate={mockOnUpdate} />);

    const firstTask = await screen.findByText('Do homework');
    const secondTask = await screen.findByText('Test React');

    expect(firstTask).toBeInTheDocument();
    expect(secondTask).toBeInTheDocument();
    expect(taskApi.getTasks).toHaveBeenCalledTimes(1);
  });

  test('creates a new task and adds it to the list', async () => {
    const user = userEvent.setup();
    (taskApi.getTasks as jest.Mock).mockResolvedValue([]);
    
    const newTask = { id: 3, description: 'New Test Task', points: 20, status: false, archived: false, repeatable: false, done: 0 };
    (taskApi.createTask as jest.Mock).mockResolvedValue(newTask);

    render(<TasksPage onUpdate={mockOnUpdate} />);

    const input = screen.getByLabelText(/description:/i);
    const pointsInput = screen.getByLabelText(/points:/i);
    const submitBtn = screen.getByRole('button', { name: /add task/i });

    await user.type(input, 'New Test Task');
    await user.type(pointsInput, '20');
    await user.click(submitBtn);

    expect(taskApi.createTask).toHaveBeenCalledWith(expect.objectContaining({
      description: 'New Test Task',
      points: 20
    }));

    expect(await screen.findByText('New Test Task')).toBeInTheDocument();
  });
});