import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> extends jest.Matchers<void, HTMLElement> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
    }
  }
}