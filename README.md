# Finances

## Requirements

### Functional Requirements

### Business Rules

### Non-functional Requirements

### Installation

npm init -y
npm i typescript @types/node -D
npx tsc --init

https://github.com/tsconfig/bases
https://www.npmjs.com/package/@tsconfig/node20

copy the tsconfig.json
include {
"include": ["src"]
}
npm i tsx -D
in package.json include{
"scripts": {
"dev": "tsx watch src/server.ts"
}
}
npm i fastify
npm i prisma -D
npx prisma init --datasource-provider SQLite
add --env-file .env in scripts on package.json
npm i zod
npm i fastify-type-provider-zod
npm i @fastify/swagger
npm i @fastify/swagger-ui
npm i fastify zod fastify-type-provider-zod @prisma/client fastify-swagger @fastify/swagger @fastify/swagger-ui
npm i bcrypt
npm i @types/bcrypt -D
npm i @fastify/jwt @fastify/cookie
npm i dotenv
npm i tsup -D