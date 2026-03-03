# BlogApp - Modern Blog Post Application

A feature-rich blog post application built with React, Redux Toolkit, and Context API. Create, edit, delete, and like blog posts with a clean and responsive user interface.

🔗 **Live Demo**: https://sarthak-blog-app-20a7a.web.app/

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Local Setup](#local-setup)
- [State Management Architecture](#state-management-architecture)
- [Deployment](#deployment)
- [Assumptions](#assumptions)
- [Project Structure](#project-structure)

---

## ✨ Features

- **View Blog Posts**: Browse a list of all published blog posts with preview cards
- **Read Full Post**: View detailed blog post content with author information and engagement metrics
- **Create New Post**: Add new blog posts with title, author, category, and content
- **Edit Posts**: Update existing blog posts with pre-populated form data
- **Delete Posts**: Remove blog posts with confirmation dialog
- **Like/Unlike Posts**: Engage with posts using the like functionality
- **Search Functionality**: Filter blog posts by title, author, category, or content
- **Persistent Storage**: All data persists in browser localStorage across sessions
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Form Validation**: Required field validation prevents empty submissions
- **Toast Notifications**: Real-time feedback for all user actions
- **404 Page**: Custom not-found page for invalid routes

---

## 🛠 Technology Stack

### Core Framework

- **React 18.3.1** - UI library for building component-based interfaces
- **Vite 6.0.11** - Fast build tool and development server

### State Management

- **Redux Toolkit 2.11.2** - Global state management for blog data
- **React Redux 9.2.0** - React bindings for Redux
- **Context API** - Cross-cutting concerns (notifications/toasts)

### Routing & Navigation

- **React Router 7.1.3** - Client-side routing

### Styling

- **Tailwind CSS 4.0.0** - Utility-first CSS framework
- **Material-UI (MUI) 6.3.1** - Form components (TextField, Button, Select)

---

## 🚀 Local Setup

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **Git** (for cloning repository)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Blog-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

4. **Build for production**

   ```bash
   npm run build
   ```

   Production-ready files will be generated in the `dist/` directory

5. **Preview production build locally**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

---

## 🏗 State Management Architecture

This application uses **both Redux and Context API** for state management, following React best practices for separation of concerns.

### Redux Toolkit - Global Application State

**Purpose**: Manages blog posts data (core application state)

**Why Redux for Blog Data?**

- Centralized store with immutable updates
- Integrates with localStorage middleware for persistence
- Redux DevTools enable powerful debugging capabilities
- Handles complex CRUD operations systematically

**Implementation**:

- **Store**: [`src/app/store.js`](src/app/store.js) with custom localStorage middleware
- **Blog Slice**: [`src/features/blogs/blogSlice.js`](src/features/blogs/blogSlice.js)
  - Reducers: `addPost`, `updatePost`, `deletePost`, `likePost`, `unlikePost`
  - State shape: Array of blog objects with id, title, author, content, category, and likes

---

### Context API - Cross-Cutting UI Concerns

**Purpose**: Manages ephemeral notification/toast messages

**Why Context for Notifications?**

- Notifications are temporary UI feedback, not core app data
- Eliminates prop drilling through nested components
- Simpler implementation for ephemeral state
- Components can trigger notifications independently
- Auto-dismisses after 4 seconds, no persistence needed

**Implementation**:

- **Provider**: [`src/contexts/NotificationContext.jsx`](src/contexts/NotificationContext.jsx)
- **Toast Component**: [`src/components/Toast.jsx`](src/components/Toast.jsx)
  - Types: 'success', 'error', 'info'
  - Fixed bottom-right positioning with smooth animations

---

### Design Decision Summary

| Concern              | Solution              | Rationale                                                             |
| -------------------- | --------------------- | --------------------------------------------------------------------- |
| **Blog Data (CRUD)** | Redux Toolkit         | Persistent, complex state requiring predictable updates and debugging |
| **Notifications**    | Context API           | Temporary UI state, simpler implementation, avoids Redux boilerplate  |
| **Routing**          | React Router          | Standard solution for client-side navigation                          |
| **Forms**            | Local Component State | Form inputs are local to components, don't need global state          |

This hybrid approach leverages the strengths of both Redux and Context API, avoiding the anti-pattern of using Redux for everything or Context for complex state.

---

## 🚀 Deployment

This application is deployed using **Firebase Hosting**, a fast and secure static hosting solution.

### 🌐 Live Application

🔗 **Live URL**: https://sarthak-blog-app-20a7a.web.app/

---

### 🔧 Deployment Strategy

- Built using Vite (`npm run build`)
- Production files generated in `dist/`
- Hosted on Firebase Hosting
- Single Page Application (SPA) routing enabled
- Automatic rewrite to `/index.html` for React Router support

---

### 📦 One-Time Setup (Already Completed)

1. Install Firebase CLI globally:

   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:

   ```bash
   firebase login
   ```

3. Initialize Firebase in the project directory:

   ```bash
   firebase init
   ```

   - Select "Hosting" and choose the existing Firebase project
   - Set `dist/` as the public directory
   - Configure as a single-page app (rewrite all URLs to `index.html`)

4. Build the application:

   ```bash
   npm run build
   ```

5. Deploy to Firebase:

   ```bash
   firebase deploy
   ```

---

## 📝 Assumptions

1. **Client-Side Only** - All data stored in browser localStorage; no backend or database
2. **No Authentication** - No user login system; anyone can create, edit, or delete posts
3. **No User Tracking** - Author is just text input
4. **Browser-Specific Data** - Data doesn't sync across devices or browsers

---

## 📁 Project Structure

```
Blog-App/
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   └── store.js        # Redux store configuration with localStorage middleware
│   ├── assets/             # Images and static files
│   ├── components/
│   │   ├── BlogCard.jsx    # Blog post preview card component
│   │   ├── ConfirmDialog.jsx  # Confirmation dialog for destructive actions
│   │   ├── Modal.jsx       # Reusable modal wrapper
│   │   ├── Navbar.jsx      # Navigation bar component
│   │   └── Toast.jsx       # Notification toast component
│   │   └── Pagination.jsx  # Pagination controls for blog listing
│   │
│   ├── contexts/
│   │   └── NotificationContext.jsx  # Context API for notifications
│   |
│   ├── features/
│   │   └── blogs/
│   │       └── blogSlice.js  # Redux slice for blog CRUD operations
│   ├── pages/
│   │   ├── BlogDetails.jsx  # Individual blog post view
│   │   ├── EditBlog.jsx     # Edit existing blog form
│   │   ├── Home.jsx         # Homepage with all blog posts
│   │   ├── NewBlog.jsx      # Create new blog form
│   │   └── NotFound.jsx     # 404 error page
│   ├── App.css             # Global styles
│   ├── App.jsx             # Root component
│   ├── index.css           # Tailwind CSS imports
│   ├── main.jsx            # Application entry point
│   └── Routes.jsx          # React Router configuration
├── firebase.json           # Firebase hosting configuration
├── .gitignore              # Git ignore patterns
├── firebaserc              # Firebase project aliases
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation (this file)
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

---

## 👤 Author

**Sarthak Bhandari**
