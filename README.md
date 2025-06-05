# React Native Expo App

This is a React Native app built with **Expo**, demonstrating features such as:

- Post list and detail views (from JSONPlaceholder)
- Favorites (stored with `AsyncStorage`)
- Authentication flow with a login modal
- Search, validation, and local state management
- Error handling and toast notifications
- Type-safe API integration using Axios + React Query + Zod
- Unit tests with Jest + React Native Testing Library

---

## Features

### Authentication
- Login modal appears when app launches
- Dummy credentials are:
  - **Username**: `admin`
  - **Password**: `1234`
- Credentials are validated using **Zod + Formik**
- Logged-in state is persisted with `AsyncStorage`

### Posts
- Posts fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts)
- Clicking on a post shows its detail view and associated comments
- Posts and comments fetched with **React Query**

### Favorites
- Users can mark posts as favorites
- Favorites are saved in local storage using `AsyncStorage`

### Search
- Case-insensitive post title and content search

### UI & Styling
- Styled using **styled-components**
- Responsive design with `react-native-size-matters`

### Validation
- Login form validated with **Zod + Formik**

---

## Tech Stack

| Tech                     | Usage                     |
|--------------------------|---------------------------|
| Expo (React Native)      | Mobile app framework      |
| TypeScript               | Type safety               |
| React Query              | Data fetching / caching   |
| Axios                    | API requests              |
| Zod                      | Schema validation         |
| AsyncStorage             | Local storage             |
| Styled-components        | Component styling         |
| react-native-size-matters| Responsive sizing         |
| Formik + Zod             | Form handling             |
| React Native Testing Library + Jest | Unit testing  |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Expo CLI** (`npm install -g expo-cli`)
- Android Studio or Xcode simulator, or Expo Go on a mobile device

### Installation

```bash
git clone https://github.com/Danilo-MB/react-native-expo-challenge.git
cd react-native-expo-challenge
npm install
