import { it, describe, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../../app/components/Search';

afterEach(() => {
  cleanup();
});

describe('Rendering Tests', () => {
  it('should render Search input field', () => {
    render(
      <Search searchTerm="" onChange={vi.fn()} onSubmit={vi.fn()} />
    );

    const input = screen.getByLabelText('pokemon-type');
    expect(input).toBeInTheDocument();
  });

  it('should render Search button', () => {
    render(
      <Search searchTerm="" onChange={vi.fn()} onSubmit={vi.fn()} />
    );
    const button = screen.getByLabelText('search');
    expect(button).toBeInTheDocument();
  });

  it('should render Example paragraph', () => {
    render(
      <Search searchTerm="" onChange={vi.fn()} onSubmit={vi.fn()} />
    );
    const paragraph = screen.getByText(/Example:/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('should render input with search term value', () => {
    const searchTerm = 'fire';
    render(
      <Search
        searchTerm={searchTerm}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    const input = screen.getByLabelText('pokemon-type');
    expect(input).toHaveValue(searchTerm);
  });
});

describe('User Interaction tests', () => {
  it('should call onChange when user types in input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Search
        searchTerm=""
        onChange={handleChange}
        onSubmit={vi.fn()}
      />
    );

    const input = screen.getByLabelText('pokemon-type');
    await user.type(input, 'fire');
    expect(handleChange).toHaveBeenCalled();
  });
  it('should call onSubmit when user clicks on Search button', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((event) => event.preventDefault());

    render(
      <Search
        searchTerm=""
        onChange={vi.fn()}
        onSubmit={handleSubmit}
      />
    );

    const button = screen.getByLabelText('search');
    await user.click(button);
    expect(handleSubmit).toHaveBeenCalled();    
  });
});
