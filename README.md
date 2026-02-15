# Dasheeo

Dasheeo is a personal customizable dashboard project for homelab environments. Built with Next.js, React, TypeScript, and Material-UI.

## Features

- 🎨 Material-UI components with dark/light theme
- 📊 Drag-and-drop widget system
- 🔌 API proxy for self-hosted services
- 💾 Persistent configuration with Zustand
- 🐳 Docker support for easy deployment
- ⚡ React Query for data fetching and caching

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker Deployment

```bash
docker-compose up -d
```

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── api/         # API routes for proxying
│   ├── layout.tsx   # Root layout with providers
│   └── page.tsx     # Main dashboard page
├── components/      # React components
├── store/           # Zustand state management
├── theme/           # MUI theme configuration
├── lib/             # Utilities and providers
└── types/           # TypeScript types
```

## Next Steps

1. Create widget components for your self-hosted services
2. Configure API endpoints in environment variables
3. Customize the theme in `src/theme/theme.ts`
4. Add service-specific widgets in `src/components/`
