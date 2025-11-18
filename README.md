# 🔌 Meal API

RESTful API backend for the Meal App ecosystem. Provides authentication, meal management, and data persistence services.

## 🔗 Main Repository

This project is part of the [Meal-App](https://github.com/Malekzie/Meal-App) monorepo.

**Related Projects:**
- [Meal-Web](https://github.com/Malekzie/Meal-Web) - Web application
- [Meal-Mobile](https://github.com/Malekzie/Meal-Mobile) - Mobile application

## 📋 Features

- ✅ User authentication and authorization
- ✅ JWT-based session management
- ✅ RESTful API endpoints
- ✅ Database schema management with Prisma
- ✅ API documentation with Swagger
- ✅ Input validation and error handling
- ✅ CORS configuration for web/mobile clients

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Documentation:** Swagger/OpenAPI
- **Authentication:** JWT
- **Package Manager:** pnpm

## 📦 Installation

### Prerequisites

- Node.js v18 or higher
- Prisma Postgres
- pnpm (recommended) or npm

### Setup

1. **Clone the repository:**
```bash
git clone git@github.com:Malekzie/Meal-API.git
cd Meal-API
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="prisma+postgres://localhost:51213/?api_key=your_key_here"
JWT_SECRET="your-secret-key-here"
PORT=3000
NODE_ENV="development"
```

4. **Set up the database:**
```bash
# Run migrations
pnpm prisma migrate dev

# (Optional) Seed the database
pnpm prisma db seed
```

5. **Start the development server:**
```bash
pnpm dev
```

The API will be running at `http://localhost:3000`

## 🚀 Usage

### API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

### Example Endpoints

#### Authentication
```bash
# Register a new user
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}

# Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Meals (Protected routes)
```bash
# Get all meals
GET /api/meals
Authorization: Bearer <your-jwt-token>

# Create a meal
POST /api/meals
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Breakfast Bowl",
  "description": "Healthy morning meal",
  "calories": 450
}
```

## 📁 Project Structure

```
Api/
├── src/
│   ├── config/          # Configuration files
│   │   └── swagger.ts   # Swagger setup
│   ├── lib/             # Utility libraries
│   │   └── prisma.ts    # Prisma client
│   ├── routes/          # API routes
│   │   └── auth/        # Authentication routes
│   │       ├── auth.ts
│   │       └── routers/
│   │           └── login.ts
│   ├── global.d.ts      # Global type definitions
│   └── index.ts         # Application entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server with hot reload

# Building
pnpm build            # Compile TypeScript to JavaScript
pnpm start            # Run production build

# Database
pnpm prisma migrate dev      # Run migrations in development
pnpm prisma migrate deploy   # Run migrations in production
pnpm prisma studio           # Open Prisma Studio (database GUI)
pnpm prisma generate         # Generate Prisma Client

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode

# Linting
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
```

## 🗄️ Database Schema

The application uses Prisma ORM with MySQL. Key models include:

- **User** - User accounts and authentication
- **Meal** - Meal records
- **MealPlan** - Meal planning schedules
- **Ingredient** - Recipe ingredients
- **Recipe** - Recipe information

View the full schema in `prisma/schema.prisma`

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Server returns a JWT token
3. Client includes token in Authorization header
4. Server validates token for protected routes

**Token Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🌐 CORS Configuration

CORS is configured to allow requests from:
- Web app (development): `http://localhost:3001`
- Mobile app (development): `http://localhost:19000`
- Production domains (configure in `.env`)

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (development/production) | Yes |
| `CORS_ORIGIN` | Allowed CORS origins | No |

## 🚀 Deployment

### Production Build

```bash
# Build the project
pnpm build

# Run migrations
pnpm prisma migrate deploy

# Start production server
pnpm start
```

### Docker (Optional)

```bash
# Build image
docker build -t meal-api .

# Run container
docker run -p 3000:3000 --env-file .env meal-api
```

## 🤝 Contributing

This project is part of the main [Meal-App](https://github.com/Malekzie/Meal-App) repository. Please make contributions there.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Rob**
- GitHub: [@Malekzie](https://github.com/Malekzie)

## 🔗 Links

- [Main Repository](https://github.com/Malekzie/Meal-App)
- [Web App](https://github.com/Malekzie/Meal-Web)
- [Mobile App](https://github.com/Malekzie/Meal-Mobile)

---

Part of the Meal App ecosystem | SAIT Web Development Project
