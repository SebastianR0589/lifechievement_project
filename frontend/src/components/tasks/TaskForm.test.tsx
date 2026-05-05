import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  const mockSubmit = jest.fn((e) => e.preventDefault());
  const mockSetDescription = jest.fn();
  const mockSetPoints = jest.fn();
  const mockSetRepeatable = jest.fn();

  const defaultProps = {
    description: '',
    points: 0,
    repeatable: false,
    onSubmit: mockSubmit,
    setDescription: mockSetDescription,
    setPoints: mockSetPoints,
    setRepeatable: mockSetRepeatable,
  };

  test('calls setDescription when user types', async () => {
    const user = userEvent.setup();
    render(<TaskForm {...defaultProps} />);

    const descInput = screen.getByLabelText(/description:/i);
    
    await user.type(descInput, 'Sport');

    expect(mockSetDescription).toHaveBeenCalled();
  });

test('calls setPoints when points are changed', async () => {
  const user = userEvent.setup();
  render(<TaskForm {...defaultProps} />);

  const pointsInput = screen.getByLabelText(/points:/i);  

  await user.clear(pointsInput);
  await user.type(pointsInput, '100');
  
 fireEvent.change(pointsInput, { target: { value: '100' } });
expect(mockSetPoints).toHaveBeenCalledWith(100);
});

  test('calls setRepeatable when repeatable checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<TaskForm {...defaultProps} />);

    const checkbox = screen.getByLabelText(/repeatable:/i);
    
    await user.click(checkbox);

    expect(mockSetRepeatable).toHaveBeenCalledWith(true);
  });

  test('calls onSubmit when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<TaskForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /add task/i });
    
    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});