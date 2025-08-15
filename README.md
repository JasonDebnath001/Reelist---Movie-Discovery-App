# 🍁 Reelist: A Modern Movie Discovery App

<div align="center">
  <img src="assets/icons/logo.png" alt="Reelist Logo" width="120" />
  <p><em>Discover, explore, and track your favourite movies with ease</em></p>
</div>

## 📱 About Reelist

Reelist is a cutting-edge mobile application built for Canadian movie enthusiasts who want to discover, explore, and keep track of their favourite films. With a sleek user interface and powerful features, Reelist provides a seamless experience for browsing trending and popular movies, searching for specific titles, and viewing detailed information about each film.

## 🚀 Key Features

- **Trending Movies**: Discover what's popular based on user search patterns
- **Latest Movies**: Browse through the newest releases in the film industry
- **Detailed Movie Information**: Access comprehensive details including:
  - Movie posters and backdrop images
  - Release dates and runtime
  - Ratings and vote counts
  - Plot summaries
  - Budget and revenue information
  - Production companies and countries
  - Cast information with photos and character names
- **Search Functionality**: Find specific movies quickly and easily
- **Responsive Design**: Enjoy a beautiful interface that works across different device sizes
- **Canadian Content Focus**: Special emphasis on Canadian productions and international films

## 🛠️ Technology Stack

- **Frontend Framework**: React Native with Expo
- **Navigation**: Expo Router with file-based routing
- **Styling**: NativeWind (TailwindCSS for React Native)
- **State Management**: React Hooks
- **API Integration**: TMDB (The Movie Database) API
- **Backend Services**: Appwrite for user data and trending analytics
- **UI Components**: Custom components with responsive design
- **Authentication**: Secure user authentication via Appwrite

## 🔧 Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/reelist.git
cd reelist
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

4. Start the development server

```bash
npx expo start
```

5. Run on your preferred platform

- Press `a` for Android
- Press `i` for iOS
- Press `w` for web

## 📂 Project Structure

```
reelist/
├── app/                  # Main application code with file-based routing
│   ├── (tabs)/           # Tab-based navigation screens
│   └── movies/           # Movie detail screens
├── assets/               # Static assets (images, icons, fonts)
├── components/           # Reusable UI components
├── constants/            # Application constants
├── interfaces/           # TypeScript interfaces
├── servies/              # API and service integrations
└── types/                # Additional TypeScript type definitions
```

## 🌐 API Integration

Reelist integrates with The Movie Database (TMDB) API to fetch movie data, including:

- Popular and trending movies
- Movie details (cast, crew, budget, etc.)
- Search functionality

The app also uses Appwrite as a backend service to track trending searches and provide personalized recommendations.

## 🇨🇦 Canadian Development Considerations

- Bilingual support infrastructure (ready for English/French localization)
- Compliance with Canadian privacy regulations
- Emphasis on Canadian film industry content
- Accessibility features following Canadian accessibility standards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Expo](https://expo.dev/) for the excellent React Native development platform
- [Appwrite](https://appwrite.io/) for backend services
- All contributors who have helped shape this project

---

<div align="center">
  <p>Developed with ❤️ in Canada</p>
</div>
