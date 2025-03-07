import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Autocomplete } from '../Autocomplete';

describe('Autocomplete', () => {
  it('renders correctly', () => {
    render(<Autocomplete>Content</Autocomplete>);
    expect(screen.getByText('Content')).toBeDefined();
  });

  it('handles theme changes', () => {
    render(<Autocomplete theme={{ type: "dark" }}>Content</Autocomplete>);
    const element = screen.getByText('Content');
    expect(element.className).includes('autocomplete--theme-dark');
  });

  it('handles custom theme values', () => {
    render(
      <Autocomplete 
        theme={{ 
          type: "custom", 
          customValues: { 
            primary: '#ff0000', 
            secondary: '#00ff00' 
          } 
        }}
      >
        Content
      </Autocomplete>
    );
    const element = screen.getByText('Content');
    expect(element.style.getPropertyValue('--custom-primary')).toBe('#ff0000');
  });

  it('handles disabled state', () => {
    render(<Autocomplete disabled>Content</Autocomplete>);
    const element = screen.getByText('Content');
    expect(element.className).includes('autocomplete--disabled');
  });
});