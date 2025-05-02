# Hostify Frontend

Welcome to the **Hostify Frontend** repository! This client-side application is built with Next.js, TypeScript, and Tailwind CSS to provide a modern and responsive user interface for the Hostify property management platform.

---

## 🚀 Prerequisites

Before setting up the project, ensure you have the following installed:

- [Bun](https://bun.sh/) (v1.0 or higher)
- [Git](https://git-scm.com/) (for version control)
- [Hostify Backend API](https://github.com/LaithMahdi/Hostify) (should be running for full functionality)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YourUsername/hostify-frontend.git
cd hostify-frontend
```

### 2️⃣ Install Dependencies

```bash
bun install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL_API=http://localhost:3000/api/v1
UPLOADTHING_TOKEN=your-uploadthing-app-id
AUTH_COOKIE=your-auth-cookie-key
NEXT_PUBLIC_SITE_URL=http://localhost:3005
```

### 4️⃣ Start the Development Server

```bash
bun run dev
```

The development server will start using Turbopack for faster builds. Visit [http://localhost:3005](http://localhost:3005) to see the application.

---

## 🧩 Project Structure

```
hostify-app/
├── app/                    # Next.js app directory
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Protected dashboard routes
│   ├── (marketing)/        # Public marketing pages
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   ├── forms/              # Form components
│   ├── cards/              # Card components
│   └── dashboard/          # Dashboard-specific components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and helpers
├── providers/              # Context providers
├── public/                 # Static assets
├── store/                  # Zustand state management
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── services/               # API service layers
```

---

## 📚 Key Features

- **Authentication System**: Secure login, registration, and user management.
- **Dashboard**: Property management interface for owners and administrators.
- **Guest House Management**: Create, update, and manage guest houses.
- **Room Management**: Manage room details, availability, and attributes.
- **Booking System**: Create and manage reservations.
- **Client Portal**: Guest access for booking and account management.
- **Dark/Light Mode**: Theme switching capabilities.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## 🛠️ Technology Stack

### Core Technologies

- **[Next.js](https://nextjs.org/)** - React framework with server-side rendering
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe code
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable UI components

### State Management & Data Fetching

- **[React Query](https://tanstack.com/query/latest)** - Data fetching and cache management
- **[Zustand](https://github.com/pmndrs/zustand)** - State management
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation

### UI Components

- **[Radix UI](https://www.radix-ui.com/)** - Primitive UI components
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[React Day Picker](https://react-day-picker.js.org/)** - Date picker
- **[Swiper](https://swiperjs.com/)** - Touch slider
- **[ApexCharts](https://apexcharts.com/)** - Modern charting library
- **[Recharts](https://recharts.org/)** - Composable chart library

### API & Data Handling

- **[Axios](https://axios-http.com/)** - HTTP client
- **[UploadThing](https://uploadthing.com/)** - File uploads
- **[date-fns](https://date-fns.org/)** - Date manipulation
- **[cookies-next](https://www.npmjs.com/package/cookies-next)** - Cookie management

---

## 📝 Available Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `bun run dev`   | Starts the development server with Turbopack |
| `bun run build` | Builds the application for production        |
| `bun run start` | Starts the production server                 |
| `bun run lint`  | Runs ESLint to check code quality            |

---

## 🌍 API Integration

The frontend connects to the Hostify Backend API. Make sure the backend is running to enable full functionality. The main API endpoints used include:

### Authentication

- Login, registration, and user profile management

### Property Management

- Guest house CRUD operations
- Room management
- Equipment listing and configuration

### Booking System

- Reservation creation and management
- Calendar availability
- Client registration and management

For detailed API documentation, refer to the backend API documentation at `http://localhost:3000/api-docs`.

---

## 📊 Dashboard Features

The Hostify dashboard includes:

- **Overview**: Key metrics and analytics
- **Properties**: Guest house management
- **Rooms**: Room availability and details
- **Bookings**: Reservation tracking and management
- **Clients**: Client database and profiles
- **Settings**: Account and system configuration

---

## 🎨 UI Customization

The application uses Tailwind CSS for styling. To customize the theme:

1. Modify the `tailwind.config.js` file for global theme changes
2. Use the `app/globals.css` file for custom styles
3. Utilize the `next-themes` provider for dark/light mode switching

---

## 🔒 Authentication Flow

The application uses JWT-based authentication:

1. User logs in through the `/login` page
2. JWT token is stored securely in cookies
3. Protected routes check authentication status
4. Automatic refresh token mechanism extends sessions

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile devices

The layout automatically adjusts based on the screen size, ensuring a consistent user experience across all devices.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📢 Feedback and Support

- If you find any bugs or issues, please open an issue on GitHub
- For feature requests, feel free to submit a PR or open an issue

---

## 🔗 Related Resources

- [Hostify Backend Repository](https://github.com/LaithMahdi/Hostify)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### 🚀 Happy Coding with Hostify Frontend! 🎉
