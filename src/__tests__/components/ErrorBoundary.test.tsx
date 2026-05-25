import React from 'react';
import { it, describe, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '@components/ErrorBoundary';
import Results from '@components/Results';
import CrashButton from '@components/CrashButton';
import { MemoryRouter } from 'react-router';

afterEach(() => {
  cleanup();
});
const handleChoose = vi.fn();
const isChecked = vi.fn();

const mockPokemons = [
  {
    name: 'bulbasaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    description: 'type - grass, poison; weight - 69; height - 7',
  },
  {
    name: 'ivysaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    description: 'type - grass, poison; weight - 130; height - 10',
  },
  {
    name: 'venusaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    description: 'type - grass, poison; weight - 1000; height - 20',
  },
];

class ErrorBoundaryChildWithError extends React.Component {
  render() {
    const shouldBeTrue = true;
    if (shouldBeTrue) {
      throw new Error('test error from error boundary child component');
    }

    return null;
  }
}

class ErrorBoundaryChildNoError extends React.Component {
  render() {
    return <p>Absolutely zero errors here!</p>;
  }
}

describe('Rendering tests', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ErrorBoundaryChildNoError />
      </ErrorBoundary>
    );

    const paragraph = screen.getByText('Absolutely zero errors here!');
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Error handling tests', () => {
  it('renders fallback UI with reset button when a child component throws new error', () => {
    render(
      <ErrorBoundary>
        <ErrorBoundaryChildWithError />
      </ErrorBoundary>
    );

    const errorBoundaryContainer = screen.getByRole('alert');
    const resetButton = within(errorBoundaryContainer).getByRole('button');
    expect(errorBoundaryContainer).toBeInTheDocument();
    expect(
      within(errorBoundaryContainer).getByRole('heading', {
        name: /Something went wrong/i,
      })
    ).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });
});

describe('User Interaction tests', () => {
  const user = userEvent.setup();

  it('renders fallback UI after clicking CrashButton', async () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Results
            pokemons={mockPokemons}
            status="success"
            handleChoose={handleChoose}
            isChecked={isChecked}
          />
          <CrashButton />
        </ErrorBoundary>
      </MemoryRouter>
    );

    const crashButton = screen.getByTestId('crash-button');
    await user.click(crashButton);
    const errorBoundaryContainer = screen.getByRole('alert');

    expect(errorBoundaryContainer).toBeInTheDocument();
  });

  it('restores children after clicking reset button inside fallback UI', async () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Results
            pokemons={mockPokemons}
            status="success"
            handleChoose={handleChoose}
            isChecked={isChecked}
          />
          <CrashButton />
        </ErrorBoundary>
      </MemoryRouter>
    );
    const crashButton = screen.getByTestId('crash-button');

    await user.click(crashButton);

    const errorBoundaryContainer = screen.getByRole('alert');
    const resetButton = within(errorBoundaryContainer).getByRole('button');

    await user.click(resetButton);
    const resultsContainer = screen.getByTestId('results-container');

    expect(resultsContainer).toBeInTheDocument();
  });
});
