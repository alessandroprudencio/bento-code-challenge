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
   git clone https://github.com/your-org/bento-integration.git
   cd bento-integration
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**  
   Create `.env` file from template:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with these values:

   | Variable                  | Description                    | Required | Example                    | How to Obtain                            |
   | ------------------------- | ------------------------------ | -------- | -------------------------- | ---------------------------------------- |
   | `NODE_ENV`                | Execution environment          | No       | `development`              | -                                        |
   | `PORT`                    | Application port               | No       | `3000`                     | -                                        |
   | `FIREBASE_PROJECT_ID`     | Firebase project ID            | Yes      | `bento-api-project`        | Firebase Console                         |
   | `FIRESTORE_EMULATOR_HOST` | Firestore Emulator host        | Emulator | `firebase-emulator:8081`   | Keep default for Docker                  |
   | `BENTO_API_URL`           | Bento API base URL             | Yes      | `https://api.bento.com/v1` | Bento documentation                      |
   | `BENTO_API_TOKEN`         | Bento API authentication token | Yes      | `Bearer eyJhbGci...`       | [See below](#-obtaining-bento_api_token) |

## 🔑 Obtaining BENTO_API_TOKEN

1. Login to Bento web interface
2. Open Chrome DevTools (F12) → Network tab
3. Find any API request after login
4. Copy the `Authorization` header value (Bearer token)
5. Set in `.env`:
   ```ini
   BENTO_API_TOKEN=copied_token_value
   ```

### ⚠️ **Important Notes:**

- **Permissions**: The token inherits all permissions of the authenticated account
- **Validity**: Tokens expire after 1 hour of inactivity
- **Security**: Never expose/share this token publicly

---

### 🔄 **How to Revoke the Token:**

1. Visit: [Google Account Security](https://myaccount.google.com/security)
2. Navigate to "Third-party apps with account access"
3. Revoke access for "Firebase CLI"

---

### 📚 **Official Documentation:**

- [Firebase CI Login Documentation](https://firebase.google.com/docs/cli#cli-ci-systems)
- [Managing API Keys & Tokens](https://firebase.google.com/docs/projects/api-keys)

---

## 🐳 Docker Services

### Service Architecture

```yaml
services:
  firebase-emulator:
    ports:
      - 8081:8081 # Firebase Emulator
      - 4000:4000 # Emulator UI
      - 9150:9150 # gRPC
      - 9000:9001 # Realtime Database

  bento-api:
    ports:
      - 3001:3000 # NestJS Application
```

### Start Services

```bash
docker-compose up --build
```

## 🛠 Development Workflow

### Local Development

```bash
npm run start:dev
```

### Docker Development

```bash
docker-compose up bento-api --build
```

### Key Endpoints

- API Docs: `http://localhost:3001/api/docs`
- Firebase UI: `http://localhost:4000`

## 🧪 Testing API

```bash
curl -X GET http://localhost:3001/api/delivery-fees
```

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
