import { it, describe, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Search from '../../app/components/Search';

describe('Search', () => {
  it('should render Search input field', () => {
    render(
      <Search searchTerm="" onChange={vi.fn()} onSubmit={vi.fn()} error="" />
    );

    const input = screen.getByLabelText('pokemon-type');
    expect(input).toBeInTheDocument();
  });
});
