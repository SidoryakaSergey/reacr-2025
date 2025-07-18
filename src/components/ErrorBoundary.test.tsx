import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { describe, it, expect, vi } from 'vitest';

const ProblemChild = () => {
  throw new Error('Test error');
  return <div />;
};

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Everything is fine</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText(/everything is fine/i)).toBeInTheDocument();
  });

  it('displays fallback UI when error is thrown', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
