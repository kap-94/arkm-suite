import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UpdateProfileForm } from '../UpdateProfileForm';

describe('UpdateProfileForm', () => {
  it('renders correctly', () => {
    render(<UpdateProfileForm>Content</UpdateProfileForm>);
    expect(screen.getByText('Content')).toBeDefined();
  });

  it('handles theme changes', () => {
    render(<UpdateProfileForm theme={{ type: "dark" }}>Content</UpdateProfileForm>);
    const element = screen.getByText('Content');
    expect(element.className).includes('updateprofileform--theme-dark');
  });

  it('handles custom theme values', () => {
    render(
      <UpdateProfileForm 
        theme={{ 
          type: "custom", 
          customValues: { 
            primary: '#ff0000', 
            secondary: '#00ff00' 
          } 
        }}
      >
        Content
      </UpdateProfileForm>
    );
    const element = screen.getByText('Content');
    expect(element.style.getPropertyValue('--custom-primary')).toBe('#ff0000');
  });

  it('handles disabled state', () => {
    render(<UpdateProfileForm disabled>Content</UpdateProfileForm>);
    const element = screen.getByText('Content');
    expect(element.className).includes('updateprofileform--disabled');
  });
});