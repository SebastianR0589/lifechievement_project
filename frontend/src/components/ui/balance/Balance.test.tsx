import { jest, describe, test, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import Balance from './Balance';

describe('Balance Component', () => {
  
  test('shows initial balance', () => {
    render(<Balance balance={500} />);
    
    const balanceValue = screen.getByText('500');
    expect(balanceValue).toBeInTheDocument();
  });

  test('applies the "gain" class when the balance increases', () => {
    const { rerender } = render(<Balance balance={100} />);
    
    rerender(<Balance balance={150} />);
    
    const balanceElement = screen.getByText('150');

    expect(balanceElement.className).toContain('gain');
  });

  test('removes the flash effect after 500ms', () => {
    jest.useFakeTimers(); 

    const { rerender } = render(<Balance balance={100} />);
    rerender(<Balance balance={150} />);
    
    const balanceElement = screen.getByText('150');
    expect(balanceElement.className).toContain('gain');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(balanceElement.className).not.toContain('gain');

    jest.useRealTimers(); 
  });
});