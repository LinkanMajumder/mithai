# Mithai

A modern e-commerce platform for authentic Indian sweets and desserts, built with React, TypeScript, and Supabase. Mithai (meaning "sweets" in Hindi) brings the rich flavors of traditional Indian confectioneries to your doorstep.

## Features

- Modern and responsive UI with Tailwind CSS
- Real-time product updates and inventory management
- Secure authentication with Supabase
- Shopping cart functionality
- Order management system
- Product search and filtering
- User profiles and order history

## Tech Stack

- React 18.2.0
- TypeScript 5.2.2
- Vite 5.1.6
- Tailwind CSS 3.4.1
- Supabase JS Client 2.39.8
- React Router 6.22.3
- Zustand 4.5.2
- Axios 1.6.7

## Prerequisites

- Node.js v20 or higher
- npm v10 or higher
- Docker and Docker Compose (optional, for containerized setup)

## Installation and Setup

### Option 1: Local Development (npm)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mithai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Option 2: Docker Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mithai
   ```

2. Create a `.env` file (same as above)

3. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

The application will be available at:
- Local Development: http://localhost:5173
- Docker Setup: http://localhost:5173

## Available Scripts

### NPM Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Docker Commands
- `docker-compose up --build` - Build and start containers
- `docker-compose up` - Start containers
- `docker-compose down` - Stop containers
- `docker-compose logs` - View container logs

## Project Structure

```
mithai/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── layouts/       # Layout components
│   ├── lib/           # Utilities and services
│   ├── store/         # Zustand store
│   ├── types/         # TypeScript types
│   └── assets/        # Static assets
├── public/            # Public assets
├── .env              # Environment variables
├── docker-compose.yml # Docker configuration
├── Dockerfile.frontend # Frontend Docker configuration
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

## Dependencies

### Core Dependencies
- @supabase/supabase-js: ^2.39.8
- axios: ^1.6.7
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.22.3
- zustand: ^4.5.2

### UI Dependencies
- class-variance-authority: ^0.7.0
- clsx: ^2.1.0
- lucide-react: ^0.358.0
- react-hot-toast: ^2.4.1
- tailwind-merge: ^2.2.1

### Development Dependencies
- typescript: ^5.2.2
- vite: ^5.1.6
- tailwindcss: ^3.4.1
- eslint: ^8.57.0
- @types/react: ^18.2.64
- @types/react-dom: ^18.2.21
- @vitejs/plugin-react: ^4.2.1

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Environment Variables

Required environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

This project is licensed under the MIT License.