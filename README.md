# Dasheeo

Dasheeo is a customizable dashboard project for homelab environments. Built with Next.js, React, TypeScript, and Material-UI.

## Features

- 🎨 Material-UI components with dark/light theme
- 📊 Drag-and-drop widget system with resizing
- 🔌 Per-widget API configuration (URL + key)
- 🔒 API proxy for self-hosted services (avoids CORS)
- 💾 Persistent configuration with Zustand
- 🎯 Multiple layout options (top bar, left/right sidebar)
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

## Configuration

### Per-Widget API Setup

Each widget can have its own API URL and key configured through the UI:
1. Click "Add Widget"
2. Enter name, service type, API URL, and API key
3. Credentials are stored securely in browser local storage

### Environment Variables (Optional)

Create `.env` for fallback credentials:

```env
SERVICE_URL=http://localhost:8080
SERVICE_API_KEY=your_api_key_here
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

## License

MIT License - see [LICENSE](LICENSE) file for details

