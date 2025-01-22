import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextField } from '../TextField';

describe('TextField', () => {
  it('renders correctly', () => {
    render(<TextField>Content</TextField>);
    expect(screen.getByText('Content')).toBeDefined();
  });

  it('handles theme changes', () => {
    render(<TextField theme={{ type: "dark" }}>Content</TextField>);
    const element = screen.getByText('Content');
    expect(element.className).includes('textfield--theme-dark');
  });

  it('handles custom theme values', () => {
    render(
      <TextField 
        theme={{ 
          type: "custom", 
          customValues: { 
            primary: '#ff0000', 
            secondary: '#00ff00' 
          } 
        }}
      >
        Content
      </TextField>
    );
    const element = screen.getByText('Content');
    expect(element.style.getPropertyValue('--custom-primary')).toBe('#ff0000');
  });

  it('handles disabled state', () => {
    render(<TextField disabled>Content</TextField>);
    const element = screen.getByText('Content');
    expect(element.className).includes('textfield--disabled');
  });
});