# Fastify, PostgreSQL, TypeScript

Production-ready Fastify backend with TypeScript, TypeORM, and ESLint.

## Features

- ✅ **Fastify** - Fast and low overhead web framework
- ✅ **TypeScript** - Type-safe development
- ✅ **TypeORM** - ORM for database management
- ✅ **ESLint** - Code quality and formatting
- ✅ **Environment Validation** - dotenv configuration
- ✅ **Development Watch Mode** - Hot reload with tsx

## Project Structure

```
src/
├── plugins/         # Business logic
├── routes/          # API endpoints
├── types/           # Interfaces and types
├── utils/           # Utility functions
└── main.ts          # Application entry point
```

## Setup Instructions

### Prerequisites

- Node.js 18+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your credentials

### Development

Start the development server with watch mode:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Start Production Server

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server with watch mode
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Configuration

All configuration is managed in `src/utils/config.ts` and environment variables in `.env`

## License

MIT
