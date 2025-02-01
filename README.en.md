# [WIP]Aurora Audiobooks 📚

[![][license-badge]][license-url]
[![][expoversion-badge]][expoversion-url]

[license-badge]: https://img.shields.io/github/license/ylzon/aurora-audiobooks?style=flat-square
[license-url]: LICENSE
[expoversion-badge]: https://img.shields.io/badge/Expo-52.0.28-blue.svg?style=flat-square
[expoversion-url]: https://expo.dev/

[English Version](README.en.md) | [中文版本](README.md)

A third-party mobile client based on Audiobookshelf, dedicated to enhancing the audiobook listening experience. Built with React Native and Expo, supporting both iOS and Android.

## ✨ Core Features
- 🚀 Optimized offline downloads with parallel download support and enhanced download management.
- ⏭️ Customizable skip functions for intros and outros.
- ⏸️ Sleep timer that stops playback by episode.
- 🌗 Theme switching functionality.
- 🌩 Improved user experience with faster load times.
- 📚 Removed unnecessary features to keep it clean.

## 🛠️ Tech Stack
- React Native
- Expo
- SQLite

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```
2. Run the project:
```bash
npm run start
```
3. Choose a platform:
```bash
npm run android
```
```bash
npm run ios
```
```bash
npm run web
```

## 📦 Project Structure
```bash
├── app
│   ├── (tabs) # Bottom navigation pages
│   ├── +html.tsx # Fallback page for web
│   ├── layout.tsx # Root layout
│   └── play.tsx # Player page
├── components
│   ├── audio # Audio components
│   └── ui # Common UI components
├── constants # Configuration constants
├── hooks # Custom hooks
├── lib # Core logic
│   ├── api # API client
│   └── db # Database module
└── types # Type definitions
```

## 🤝 Contributing
Feel free to submit PRs to help improve the project!

## 📝 License
[MIT](LICENSE)
