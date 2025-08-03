import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useContext } from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeContext from './ThemeContext';

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  const ConsumerComponent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
      <div>
        <p data-testid="theme-value">{theme}</p>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    );
  };

  it('should default to dark theme', () => {
    render(
      <ThemeProvider>
        <ConsumerComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    render(
      <ThemeProvider>
        <ConsumerComponent />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should toggle theme back to dark', () => {
    render(
      <ThemeProvider>
        <ConsumerComponent />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Toggle'));

    fireEvent.click(screen.getByText('Toggle'));

    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
