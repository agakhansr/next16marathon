# Next16 Marathon - Advanced Authentication System

A complete authentication system built with **Next.js 16**, **React 19**, **Jotai**, and **React Query**.

## Features

✨ **Complete Authentication**
- User signup with validation
- Secure login with JWT tokens
- Logout functionality
- User profile (me endpoint)

🔒 **Security**
- Password hashing with SHA-256
- JWT token-based authentication
- Token expiration (7 days)
- Secure token storage

📁 **Architecture**
- Feature-Sliced Design (FSD)
- API route handlers
- JSON database for persistence
- Client-side state management with Jotai

🎨 **UI/UX**
- Dark mode support
- Responsive design
- Form validation
- Error handling

## Project Structure

```
features/auth/
  ├── api/
  │   ├── queries.ts (React Query hooks)
  │   └── types.ts (TypeScript interfaces)
  ├── model/
  │   └── authStore.ts (Jotai atoms)
  └── ui/
      ├── SignupForm.tsx
      └── LoginForm.tsx

app/
  ├── api/auth/
  │   ├── signup/route.ts
  │   ├── login/route.ts
  │   ├── me/route.ts
  │   └── logout/route.ts
  ├── signup/page.tsx
  ├── login/page.tsx
  ├── dashboard/page.tsx
  ├── todos/page.tsx
  └── page.tsx (Home)

shared/
  ├── db/
  │   └── users.ts (JSON database)
  └── utils/
      └── auth.ts (Auth utilities)
```

## API Endpoints

### POST `/api/auth/signup`
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Signup successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "1234567890",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### POST `/api/auth/login`
Login with email and password.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "1234567890",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### GET `/api/auth/me`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "User retrieved",
  "user": {
    "id": "1234567890",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### POST `/api/auth/logout`
Logout current user (client-side token removal).

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## Pages

- **/** - Home page (shows login/signup or dashboard links)
- **/signup** - User registration
- **/login** - User login
- **/dashboard** - User profile dashboard (protected)
- **/todos** - Todo management (protected)

## Usage

### Authentication Flow

1. **Sign Up**: Create new account at `/signup`
2. **Login**: Log in with credentials at `/login`
3. **Protected Pages**: Access dashboard and todos (auto-redirects to login if not authenticated)
4. **Logout**: Click logout button to clear token and return to home

### State Management

```typescript
// Get current user
const [user] = useAtom(currentUserAtom);

// Check if authenticated
const [isAuthenticated] = useAtom(isAuthenticatedAtom);

// Get auth token
const [token] = useAtom(authTokenAtom);
```

### Mutations

```typescript
// Sign up
const { mutate: signup } = useSignupMutation();

// Login
const { mutate: login } = useLoginMutation();

// Logout
const { mutate: logout } = useLogoutMutation();
```

### Queries

```typescript
// Get current user
const { data } = useMeQuery(enabled);

// Initialize auth on app load
useAuthInit();
```

## Database

User data is stored in `data/users.json`:

```json
[
  {
    "id": "1234567890",
    "email": "john@example.com",
    "password": "a7f3c2e1b4d9...", // hashed
    "name": "John Doe",
    "createdAt": "2025-12-03T10:30:00.000Z"
  }
]
```

## Environment Variables

```bash
# Optional - set to custom secret
JWT_SECRET=your-secret-key-change-in-production
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

## Security Notes

⚠️ **For Production:**
1. Use environment variables for secrets
2. Replace SHA-256 with bcrypt or argon2
3. Use HTTPS for all communications
4. Implement rate limiting
5. Add CSRF protection
6. Store tokens securely (httpOnly cookies)
7. Add refresh token mechanism
8. Implement 2FA

## Tech Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **Jotai** - State management
- **React Query** - Server state management
- **JWT** - Authentication tokens
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

---

Built with ❤️ using modern React patterns and best practices.
