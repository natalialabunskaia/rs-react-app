import { it, describe, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import SearchStatus from '@components/Spinner';

afterEach(() => {
  cleanup();
});

describe('SearchStatus rendering', () => {
  it("renders a spinner when requestStatus is 'loading'", () => {
    const status = 'loading';
    render(<SearchStatus requestStatus={status} error={''} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it("renders the error message passed via the error prop when requestStatus is 'error'", () => {
    const status = 'error';
    const errorMessage = 'test error message';
    render(<SearchStatus requestStatus={status} error={errorMessage} />);
    const errorParagraph = screen.getByText(errorMessage);
    expect(errorParagraph).toBeInTheDocument();
  });

  it("renders nothing when requestStatus is 'idle', even if error is provided", () => {
    const status = 'idle';
    const errorMessage = 'test error message';
    render(<SearchStatus requestStatus={status} error={errorMessage} />);
    const spinner = screen.queryByRole('status');
    const errorParagraph = screen.queryByText(errorMessage);
    expect(spinner).not.toBeInTheDocument();
    expect(errorParagraph).not.toBeInTheDocument();
  });

  it("renders nothing when requestStatus is 'success', even if error is provided", () => {
    const status = 'success';
    const errorMessage = 'test error message';
    render(<SearchStatus requestStatus={status} error={errorMessage} />);
    const spinner = screen.queryByRole('status');
    const errorParagraph = screen.queryByText(errorMessage);
    expect(spinner).not.toBeInTheDocument();
    expect(errorParagraph).not.toBeInTheDocument();
  });
});
