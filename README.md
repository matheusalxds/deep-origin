# 🚀 Project Overview

This project consists of a NestJS API with GraphQL, following TDD principles and structured with Use Cases. The API includes rate-limiting using the Guard Throttler and is fully tested with Jest.

The frontend is built with Next.js and styled using TailwindCSS.

## 🛠 Backend - API (NestJS + GraphQL)

You can access the API at: http://localhost:3001/graphql

#### Features

⚡ NestJS framework

🔗 GraphQL API with resolvers and schema validation

✅ TDD approach ensuring reliability

🏗 Use Case pattern for business logic separation

🛡 Guard Throttler for rate-limiting

🧪 Jest for unit and integration tests

🛢 TypeORM for database management

🗄 PostgreSQL as the database

🚀 Apollo Client for GraphQL state management

___
## 🎨 Frontend - Next.js + TailwindCSS

You can access the frontend at: http://localhost:3000

### Features

⚛ Next.js framework for server-side rendering and static generation

🎨 TailwindCSS for modern styling and responsive design

🚀 Apollo Client for GraphQL state management

___
## 🐳 Docker and Docker Compose

The entire project is containerized using Docker 🐳 and orchestrated with Docker Compose 📦 to simplify development and deployment. This ensures consistency across different environments and makes it easier to set up the project with minimal configuration.

To start the project using Docker, simply run:

```sh
docker-compose up --build
```

