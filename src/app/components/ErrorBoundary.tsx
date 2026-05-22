import React from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '@utils/types';

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }

  handleClick = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <section className="container-fluid container-xxl p-5">
          <div className="alert alert-danger text-center" role="alert">
            <h2>Something went wrong</h2>
            <p>Please reload the page or try again later.</p>
            <button
              onClick={this.handleClick}
              type="button"
              className="btn btn-primary"
              role="button"
            >
              Try again
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
