import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

// Placeholder smoke test for the Vite scaffold's default App.tsx.
// Replaced once the real portfolio components land.
describe('App scaffold', () => {
  it('renders and responds to interaction', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /get started/i })).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /count is 0/i });
    await userEvent.click(button);
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument();
  });
});
