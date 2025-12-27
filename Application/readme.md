# GApplication

A modern, cross-platform **cryptocurrency wallet** application built with React, TypeScript, and Tauri. GApp provides secure wallet management with multi-language.

## Overview

GApp is a full-stack wallet application that combines:
- **React 19** frontend with TypeScript and TailwindCSS for responsive UI
- **Tauri** for cross-platform desktop and mobile support

## Features

### Core Functionality
- 🔐 **Wallet Management** - Create and manage Ethereum wallets using BIP39 mnemonic phrases
- 💳 **Account Management** - Secure login with passcode and seed phrase recovery
- 🔑 **Private Key Handling** - Securely derive and manage private keys using HD wallet derivation
- ✍️ **Message Signing** - Sign messages with wallet private keys
- 📱 **Cross-Platform** - Available on Windows/Mac desktop and Android/iOS mobile
- 🌐 **Multi-Language** - Full internationalization support for 7 languages

## Project Structure

```
src/
├── assets/              # Static assets
├── components/          # Reusable React components
├── core/                # Core business logic
├── layout/              # Layout components
├── page/                # Main application pages
├── utility/             # Helper functions
├── app.tsx              # Root application component
├── app.css              # Global styles
├── index.html           # HTML entry point
└── type.d.ts            # TypeScript type definitions

src-tauri/               # Backend (Rust/Tauri)
└── tauri.conf.json      # Tauri configuration
```

## Technology Stack

### Frontend
- **React 19.2.1** - UI library
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.2.7** - Build tool
- **TailwindCSS 4.1.17** - Utility-first CSS
- **Motion 12.23.25** - Animation library
- **Swiper 12.0.3** - Carousel/slider component
- **React Icons 5.5.0** - Icon library
- **Ethers.js 6.16.0** - Ethereum Web3 library

### Backend
- **Tauri** - Desktop/Mobile framework
  - Store plugin - Persistent storage
  - OS plugin - Platform detection
  - Window/Tray API - Window management
- **Rust 2021 edition** - Backend logic

### Development
- **ESLint 9.39.1** - Code linting
- **TypeScript ESLint** - TS linting rules
- **Better TailwindCSS** - Tailwind linting

## Installation

### Prerequisites
- **Node.js** (18+) and npm
- **Rust** (for building Tauri apps)
- **Android SDK** (for Android builds)

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/GApplication/GApplication
   cd Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Development

### Run Desktop App (Development)
```bash
npm run desktop
```
Launches the Tauri application in development mode with hot-reload

### Lint Code
```bash
npm run lint
```
Run ESLint on all TypeScript files in `src/`

### Fix Linting Issues
```bash
npm run lint:fix
```
Automatically fix ESLint violations

## Building

### Build for Desktop
```bash
npm run desktop-build
```
Creates executable for Windows desktop

### Build for Android (AAB)
```bash
npm run android-aab
```
Creates Android App Bundle for Play Store distribution

### Build for Android (APK)
```bash
npm run android-apk
```
Creates standalone Android APK file

## Internationalization

Supports **7 languages** with complete translations:
- **English** (en)
- **Persian/Farsi** (fa)
- **Turkish** (tr)
- **Arabic** (ar)
- **Chinese Simplified** (zh)
- **Russian** (ru)
- **Hindi** (hi)

Translation files are located in `src/assets/lang/` and use dotted key paths for nested translations.

## Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| Windows Desktop | ✅ Production Ready | Tauri desktop build |
| Android Mobile | ✅ Development | Tauri mobile build |
| macOS | ⚠️ Not Configured | Can be added |
| Linux | ⚠️ Not Configured | Can be added |
