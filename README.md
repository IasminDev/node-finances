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