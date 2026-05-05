import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RewardForm from './RewardForm';

describe('RewardForm Component', () => {
  const mockSubmit = jest.fn((e) => e.preventDefault());
  const mockSetDescription = jest.fn();
  const mockSetCost = jest.fn();
  const mockSetRepeatable = jest.fn();

  const defaultProps = {
    description: '',
    cost: 0,
    repeatable: false,
    onSubmit: mockSubmit,
    setDescription: mockSetDescription,
    setCost: mockSetCost,
    setRepeatable: mockSetRepeatable,
  };

  test('calls setDescription when user types', async () => {
    const user = userEvent.setup();
    render(<RewardForm {...defaultProps} />);

    const descInput = screen.getByLabelText(/description:/i);
    
    await user.type(descInput, 'Cinema');

    expect(mockSetDescription).toHaveBeenCalled();
  });

test('calls setCost when cost is changed', async () => {
  const user = userEvent.setup();
  render(<RewardForm {...defaultProps} />);

  const costInput = screen.getByLabelText(/cost:/i);  

  await user.clear(costInput);
  await user.type(costInput, '100');
  
 fireEvent.change(costInput, { target: { value: '100' } });
expect(mockSetCost).toHaveBeenCalledWith(100);
});

  test('calls setRepeatable when repeatable checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<RewardForm {...defaultProps} />);

    const checkbox = screen.getByLabelText(/repeatable:/i);
    
    await user.click(checkbox);

    expect(mockSetRepeatable).toHaveBeenCalledWith(true);
  });

  test('calls onSubmit when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<RewardForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /add reward/i });
    
    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});