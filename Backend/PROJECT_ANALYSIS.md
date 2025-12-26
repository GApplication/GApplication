# Wallet Backend - Project Analysis

## Overview
This is a **Fastify-based REST API backend** for a wallet application. It tracks when users come online and stores their system information in a MySQL database.

**Tech Stack:**
- **Framework:** Fastify (fast HTTP server)
- **Database:** TypeORM + MySQL
- **Validation:** TypeBox (JSON Schema validation)
- **API Documentation:** Swagger/OpenAPI
- **Rate Limiting:** Custom in-memory rate limiter

---

## Architecture

### Directory Structure
```
src/
├── main.ts                 # Server entry point - initializes Fastify and plugins
├── plugins/                # Reusable Fastify plugins
│   ├── typeorm.ts          # Database connection plugin
│   └── ratelimit.ts        # Rate limiting plugin
├── routes/                 # API route handlers (auto-loaded)
│   └── user/
│       ├── user.route.ts   # Route definitions
│       ├── user.service.ts # Business logic handlers
│       ├── user.schema.ts  # Request/response validation schemas
│       └── user.entity.ts  # Database table definition
├── types/                  # TypeScript type definitions
│   └── fastify.ts          # Fastify module augmentation
└── utils/                  # Utility functions
    └── config.ts           # Environment variable loading and validation
```

---

## Key Components

### 1. **Server Setup (main.ts)**
- Initializes Fastify with logging and proxy trust
- Registers plugins in order:
  1. **Swagger** - API documentation (dev only)
  2. **Rate Limiter** - Protects endpoints from abuse
  3. **TypeORM** - Database connection
  4. **AutoLoad** - Automatically loads route files
- Implements global error handler for validation and server errors

**Key Features:**
- Validation errors return 400 Bad Request
- Server errors return 500 Internal Server Error
- Swagger UI accessible at `/api` in development

### 2. **Database Plugin (plugins/typeorm.ts)**
- Creates TypeORM DataSource with MySQL configuration
- Automatically discovers entity files (*.entity.ts)
- Decorates Fastify instance with `fastify.db` property
- Properly cleans up database connection on server shutdown

**How it works:**
```typescript
// Available in all routes after plugin registration
await fastify.db.getRepository(User).save(userData);
```

### 3. **Rate Limiting (plugins/ratelimit.ts)**
- In-memory rate limiter using Map data structure
- Limits requests per IP address and endpoint
- Time-window based (e.g., 2 requests per 10 minutes)
- Returns HTTP 429 (Too Many Requests) when exceeded

**Response Headers:**
- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Requests left in window
- `X-RateLimit-Reset` - When the window expires (Unix timestamp)

### 4. **Type Augmentation (types/fastify.ts)**
- Extends Fastify's type definitions to recognize custom properties
- Tells TypeScript about `fastify.db` property
- Configures rate limit interface for routes

**Why it's needed:**
```typescript
// Without augmentation, TypeScript doesn't know fastify.db exists
// Augmentation tells it to expect: fastify.db: DataSource
```

### 5. **Configuration (utils/config.ts)**
- Loads environment variables from .env file
- Validates all required variables at startup
- Provides type-safe conversion (string → number/boolean)
- Fails fast if any required variable is missing

**Environment Variables Needed:**
```
NODE_ENV=development
NODE_PORT=3000
NODE_HOST=localhost
NODE_DB_TYPE=mysql
NODE_DB_HOST=localhost
NODE_DB_PORT=3306
NODE_DB_USERNAME=root
NODE_DB_PASSWORD=password
NODE_DB_DATABASE=gapp
NODE_DB_SYNC=true
NODE_DB_LOG=false
```

---

## User Endpoint

### POST /user/online
**Purpose:** Records when a user comes online with their system information

**Request Body (validated by userBody schema):**
```json
{
  "arch": "x64",           // Machine architecture
  "family": "Windows",     // OS family
  "hostname": "PC-NAME",   // Device name
  "locale": "en-US",       // Language/locale
  "platform": "win32",     // Platform identifier
  "type": "Windows",       // OS type
  "version": "10.0.19041"  // OS version
}
```

**Response (validated by userResponse schema):**
```json
{
  "result": 0  // 0 = success, 1 = failure
}
```

**Rate Limiting:** 2 requests per 10 minutes per IP address

**Database Operation:**
```typescript
// Saves to 'user' table with auto-generated id and created_at
User {
  id: 1,
  ip: "192.168.1.100",
  arch: "x64",
  family: "Windows",
  hostname: "PC-NAME",
  locale: "en-US",
  platform: "win32",
  type: "Windows",
  version: "10.0.19041",
  created_at: "2025-12-24T10:30:00Z"
}
```

---

## Request Flow

### 1. **Request Arrives**
```
POST /user/online
Content-Type: application/json
Body: { arch: "x64", ... }
From IP: 192.168.1.100
```

### 2. **Rate Limit Check**
- **plugins/ratelimit.ts** preHandler hook runs first
- Checks if this IP exceeded limit for "user-online" endpoint
- Returns 429 if exceeded, adds response headers
- Decrements remaining count

### 3. **Request Validation**
- **Fastify's built-in validator** checks body against userBody schema
- Returns 400 if validation fails
- Provides parsed/validated body to handler

### 4. **Handler Execution**
- **user.service.ts** handler receives request
- Gets the User repository: `fastify.db.getRepository(User)`
- Combines IP address with request body
- Saves to database: `userRepository.save({ ip: request.ip, ...body })`

### 5. **Response**
- Handler returns `{ result: 0 }`
- **Response validator** checks against userResponse schema
- Returns 200 OK with validated response

---

## Data Flow Diagram

```
┌─────────────────────┐
│  HTTP Request       │
│  POST /user/online  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  Rate Limit Plugin (preHandler)     │
│  - Check IP:endpoint limits         │
│  - Add response headers             │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  Request Validation                 │
│  - Validate body with userBody      │
│  - Return 400 if invalid            │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  Route Handler (user.service.ts)    │
│  - Get User repository              │
│  - Combine IP + body data           │
│  - Save to database                 │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  Response Validation                │
│  - Validate response with schema    │
│  - Return 200 if valid              │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────┐
│  HTTP Response      │
│  200 OK             │
│  { result: 0 }      │
└─────────────────────┘
```

---

## Key Patterns Used

### 1. **Plugin Pattern**
- Plugins extend Fastify with reusable functionality
- Plugins run in sequence (order matters!)
- Each plugin can decorate the instance with new properties

### 2. **Service Pattern**
- Service exports a factory function that receives Fastify instance
- Returns schema + handler tuple for route registration
- Keeps business logic separate from routing

### 3. **Schema Pattern**
- Define validation schemas once, reuse everywhere
- TypeBox generates both JSON Schema and TypeScript types
- Auto-generates OpenAPI documentation

### 4. **Builder Pattern**
- Config module uses builder to validate and convert env vars
- Provides type-safe access throughout app
- Fails fast on startup if config is invalid

### 5. **Type Augmentation**
- Extend existing types (Fastify) without modifying source
- TypeScript recognizes dynamically added properties
- Provides intellisense and type checking

---

## Error Handling

### Validation Errors (400)
```json
{
  "error": "Bad Request",
  "message": "arch must be a string"
}
```

### Server Errors (500)
```json
{
  "error": "Internal Error",
  "message": "Error details..."
}
```

### Rate Limit Exceeded (429)
```
X-RateLimit-Limit: 2
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1735050600
```

---

## Development vs Production

| Feature | Development | Production |
|---------|-------------|-----------|
| Logger | Detailed trace logging | Minimal logging |
| Swagger | Enabled at `/api` | Disabled |
| Database Sync | Auto-sync schema | Manual migrations |
| Database Logs | Log all queries | Log errors only |
| Environment | development | production |

---

## Common Operations

### Running the Server
```bash
npm run dev    # Watch mode with auto-reload
npm run build  # Compile TypeScript
npm start      # Run compiled version
```

### Testing the /user/online Endpoint
```bash
curl -X POST http://localhost:3000/user/online \
  -H "Content-Type: application/json" \
  -d '{
    "arch": "x64",
    "family": "Windows",
    "hostname": "test",
    "locale": "en-US",
    "platform": "win32",
    "type": "Windows",
    "version": "10"
  }'
```

### Checking Rate Limits
- Send 2 requests → both succeed with `X-RateLimit-Remaining: 0`
- Send 3rd request within 10 minutes → 429 Too Many Requests
- Wait 10 minutes → counter resets, can send 2 more requests

---

## Database Schema

### User Table
```sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ip` varchar(64) NOT NULL,
  `arch` varchar(64) NOT NULL,
  `family` varchar(64) NOT NULL,
  `hostname` varchar(64) NOT NULL,
  `locale` varchar(64) NOT NULL,
  `platform` varchar(64) NOT NULL,
  `type` varchar(64) NOT NULL,
  `version` varchar(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## Troubleshooting

### "Cannot find property 'db' on FastifyInstance"
- Missing import of `./types/fastify` in main.ts
- TypeScript doesn't recognize the augmentation without the import

### "Address already in use" Error
- Port 3000 is taken by another process
- Kill the process or use a different port

### "Missing required environment variable"
- Check .env file exists with all required variables
- Verify variable names match exactly (case-sensitive)

### Rate limiter not working
- Verify `rateLimit` plugin registers before routes load
- Check `trustProxy: true` is set in Fastify config (for correct IP detection)
