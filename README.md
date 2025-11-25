# Rituals - Personal Sleep Coach

A cross-platform (mobile + web) personal sleep coach that generates daily personalized pre-sleep and morning rituals to reduce sleep latency and improve sleep quality.

## Features

- **Personalized Ritual Builder**: Daily customized pre-sleep and morning rituals
- **Guided Audio Sessions**: Audio-first playback for wind-down and in-bed relaxation
- **Sleep Tracking**: Integration with wearables (Apple Health, Google Fit, Oura, Fitbit, Garmin)
- **Sleep Journal**: Structured pre-sleep and morning journaling with voice-to-text
- **Progress Analytics**: Track sleep quality, latency, and habit streaks
- **Onboarding Assessment**: Multi-step wizard to personalize your experience

## Tech Stack

- **Framework**: React Native with Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: React Navigation
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
```bash
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── ui/        # Base UI components (Button, Card, Input, etc.)
├── screens/       # Screen components
├── navigation/    # Navigation configuration
├── hooks/         # Custom React hooks (data fetching)
├── lib/           # Utilities and API client
└── types/         # TypeScript type definitions
```

## Design System

The app follows a calm, minimal design system:

- **Primary Color**: Calm Indigo (#2C3E8A)
- **Accent Color**: Soft Lavender (#A79BE2)
- **Background**: Paper (#F6F7FB)
- **Typography**: Inter font family
- **Spacing**: 8px baseline grid

## Key Screens

- **Landing**: Marketing and conversion funnel
- **Login/Signup**: Authentication with social OAuth
- **Onboarding**: Multi-step assessment wizard
- **Dashboard**: Daily home with ritual, sleep score, and progress
- **Ritual Builder**: Editable ritual timeline generator
- **Guided Player**: Audio-first playback with minimal visual mode
- **Journal**: Pre-sleep and morning journaling
- **Profile**: User settings and account management

## API Integration

The app uses a centralized API layer in `src/lib/api.ts`. All API calls go through this client which handles:
- Authentication tokens
- Error handling
- Request/response transformation

## Environment Variables

Create a `.env` file in the root directory:

```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

## Development Notes

- All components use NativeWind for styling (Tailwind CSS classes)
- TypeScript is strictly enforced
- React Query handles all data fetching and caching
- Forms use React Hook Form with Zod validation
- Navigation uses React Navigation with type-safe routes

## Next Steps

1. Set up backend API endpoints
2. Implement authentication flow
3. Add audio playback functionality
4. Integrate wearable APIs
5. Set up push notifications
6. Implement subscription/payment processing

## License

Private project
