# Aurea – Finance API  

This repository contains the backend for the **Aurea** personal finance management application. It provides a RESTful API to handle financial transactions, user authentication, and data storage. The frontend for this project is available in the [react-finances](https://github.com/IasminDev/react-finances) repository.  

## Features  

- **User Authentication**: Secure user registration and login.  
- **Transaction Management**: Add, edit, and delete income and expense records.  
- **Data Persistence**: Stores financial data in a database.  
- **API Endpoints**: RESTful API for frontend integration.  

## Technologies Used  

- **Node.js**: JavaScript runtime for server-side development.  
- **Express.js**: Web framework for building APIs.  
- **MongoDB / PostgreSQL** (Specify if using one): Database for storing transactions.  
- **JWT Authentication**: Secure user authentication.  
- **Dotenv**: Manages environment variables.  

## How to Run the Project  

1. Clone the repository:  
   ```bash
   git clone https://github.com/IasminDev/node-finances.git
   ```
2. Navigate to the project directory:  
   ```bash
   cd node-finances
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file (example below):  
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   ```
5. Start the server:  
   ```bash
   npm run dev
   ```
6. The API will be available at `http://localhost:PORT` (default: 3000).  
