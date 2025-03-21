# Bento API Integration Project

A NestJS application integrating with Bento API and Firebase emulator suite.

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- Docker & Docker Compose
- Bento API account credentials

## ⚙️ Environment Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/alessandroprudencio/bento-api.git
   cd bento-api
   ```

2. **Install dependencies**

   ```bash
   yarn
   ```

3. **Environment Configuration**  
   Create `.env` file from template:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with these values:

   | Variable                  | Description                    | Required | Example                       | How to Obtain                            |
   | ------------------------- | ------------------------------ | -------- | ----------------------------- | ---------------------------------------- |
   | `NODE_ENV`                | Execution environment          | No       | `development`                 | -                                        |
   | `PORT`                    | Application port               | No       | `3000`                        | -                                        |
   | `FIREBASE_PROJECT_ID`     | Firebase project ID            | Yes      | `bento-api-project`           | Firebase Console                         |
   | `FIRESTORE_EMULATOR_HOST` | Firestore Emulator host        | Yes      | `firebase-emulator:8081`      | Keep default for Docker                  |
   | `BENTO_API_URL`           | Bento API base URL             | Yes      | `https://api.bento.ky/api/v1` | Bento documentation                      |
   | `BENTO_API_TOKEN`         | Bento API authentication token | Yes      | `eyJhbGciOiJSUz...`           | [See below](#-obtaining-bento_api_token) |

### 🔑 Obtaining BENTO_API_TOKEN

1. Login to Bento web interface
2. Open Chrome DevTools (F12) → Network tab
3. Find any API request after login
4. Copy the `Authorization` header value (Bearer token)
5. Set in `.env`:
   ```ini
   BENTO_API_TOKEN=copied_token_value
   ```

### 🐳 Start Services

```bash
docker-compose up --build
```

## 🛠 Development Workflow

### Local Development

```bash
yarn start:dev
```

### Key Endpoints

- API Docs: `http://localhost:3001/api/docs`
- Firebase UI: `http://localhost:4000`

## 🚨 Troubleshooting

**Common Issues:**

1. **Missing .env variables**  
   Verify all required variables are set in `.env`

2. **Docker port conflicts**  
   Check running containers:

   ```bash
   docker ps
   ```

3. **Invalid Bento token**
   - Verify token format: `Bearer <token>`
   - Re-authenticate with Bento web interface
