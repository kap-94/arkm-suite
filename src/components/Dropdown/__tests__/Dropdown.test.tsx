import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dropdown } from '../Dropdown';

describe('Dropdown', () => {
  it('renders correctly', () => {
    render(<Dropdown>Content</Dropdown>);
    expect(screen.getByText('Content')).toBeDefined();
  });

  it('handles theme changes', () => {
    render(<Dropdown theme={{ type: "dark" }}>Content</Dropdown>);
    const element = screen.getByText('Content');
    expect(element.className).includes('dropdown--theme-dark');
  });

  it('handles custom theme values', () => {
    render(
      <Dropdown 
        theme={{ 
          type: "custom", 
          customValues: { 
            primary: '#ff0000', 
            secondary: '#00ff00' 
          } 
        }}
      >
        Content
      </Dropdown>
    );
    const element = screen.getByText('Content');
    expect(element.style.getPropertyValue('--custom-primary')).toBe('#ff0000');
  });

  it('handles disabled state', () => {
    render(<Dropdown disabled>Content</Dropdown>);
    const element = screen.getByText('Content');
    expect(element.className).includes('dropdown--disabled');
  });
});