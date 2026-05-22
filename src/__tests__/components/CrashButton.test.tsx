import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CrashButton from '@components/CrashButton';

it('renders Crash App button', () => {
  render(<CrashButton />);
  const button = screen.getByTestId('crash-button');
  expect(button).toBeInTheDocument();
});
