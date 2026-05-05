import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RewardsPage from './RewardsPage';
import * as rewardApi from '../api/rewardApi'; 

jest.mock('../api/rewardApi');

describe('RewardsPage Integration', () => {
  const mockOnUpdate = jest.fn();

  const fakeRewards = [
    { id: 1, description: 'Cinema', cost: 50, status: false, archived: false, repeatable: false, done: 0 },
    { id: 2, description: 'Gaming', cost: 100, status: false, archived: false, repeatable: true, done: 0 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads rewards', async () => {
    (rewardApi.getRewards as jest.Mock).mockResolvedValue(fakeRewards);

    render(<RewardsPage onUpdate={mockOnUpdate} />);

    const firstReward = await screen.findByText('Cinema');
    const secondReward = await screen.findByText('Gaming');

    expect(firstReward).toBeInTheDocument();
    expect(secondReward).toBeInTheDocument();
    expect(rewardApi.getRewards).toHaveBeenCalledTimes(1);
  });

  test('creates a new reward and adds it to the list', async () => {
    const user = userEvent.setup();
    (rewardApi.getRewards as jest.Mock).mockResolvedValue([]);
    
    const newReward = { id: 3, description: 'New Test Reward', cost: 20, status: false, archived: false, repeatable: false, done: 0 };
    (rewardApi.createReward as jest.Mock).mockResolvedValue(newReward);

    render(<RewardsPage onUpdate={mockOnUpdate} />);

    const input = screen.getByLabelText(/description:/i);
    const pointsInput = screen.getByLabelText(/cost:/i);
    const submitBtn = screen.getByRole('button', { name: /add reward/i });

    await user.type(input, 'New Test Reward');
    await user.type(pointsInput, '20');
    await user.click(submitBtn);

    expect(rewardApi.createReward).toHaveBeenCalledWith(expect.objectContaining({
      description: 'New Test Reward',
      cost: 20
    }));

    expect(await screen.findByText('New Test Reward')).toBeInTheDocument();
  });
});