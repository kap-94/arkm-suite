# Header Component

A modern, animated header component for Next.js applications with mobile responsiveness and smooth animations.

## Features

- Animated text with hover effects
- Mobile-responsive design
- Smooth scroll transitions
- Language selector
- Portal button with gradient effects
- Glass morphism effects

## Usage

```tsx
import Header from "@/components/Header";

export default function Layout() {
  return (
    <>
      <Header />
      {/* Your content */}
    </>
  );
}
```

## Structure

```
Header/
├── components/       # Subcomponentes
├── context/         # Context del Header
├── hooks/           # Custom hooks
├── styles/          # Estilos SCSS
├── types/           # TypeScript types
└── utils/           # Utilidades
```

## Dependencies

- Next.js 14+
- Framer Motion
- Lucide React
- SCSS Modules

## Props & Configuration

The Header component uses context for configuration. Main customizable features:

- Navigation items
- Language selection
- Cursor effects
- Mobile menu behavior

## Customization

Styles can be customized through the SCSS variables in `styles/_variables.scss`:

```scss
$primary-color: #6366f1;
$header-height: 80px;
// etc...
```

## Animations

Text animations are handled by Framer Motion and can be customized in the `AnimatedText` component.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
