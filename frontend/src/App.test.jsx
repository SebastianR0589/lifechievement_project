import { render, screen } from '@testing-library/react';
import React from 'react'; // Sicherungshalber für Babel

test('Jest mit Babel läuft!', () => {
  render(<h1>Hallo Welt</h1>);
  const heading = screen.getByText(/Hallo Welt/i);
  expect(heading).toBeInTheDocument();
});