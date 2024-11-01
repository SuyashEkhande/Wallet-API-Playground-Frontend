
# Wallet API Playground Frontend

This frontend is a simple wallet application designed as a learning tool to understand **User Interfaces**, **State Management**, **Routing**, and **API Integration**. The project is built using **React** with **Vite** as the build tool.

## Backend

For the backend of this project, visit the following repo: [Wallet API Playground Backend](https://github.com/SuyashEkhande/Wallet-API-Playground-Backend/tree/master).

## Learning Objectives

This project provides hands-on practice with:

-   Implementing user interfaces with React components
-   Managing application state with hooks and context
-   Handling routing with React Router
-   Making API calls to a backend server
-   Validating user input and displaying feedback

## Features

-   **User Authentication**: Enables user signup and login with token-based authentication.
-   **Balance Checking & Fund Transfers**: Users can check their account balance and transfer funds securely.
-   **User Search**: Provides a search feature to filter users by first or last name.
-   **Responsive Design**: Ensures the application is user-friendly across various devices.

## Tech Stack

-   **React** for building the user interface
-   **Vite** as the build tool for fast development and optimized production builds
-   **Axios** for making API calls to the backend
-   **React Router** for handling navigation between different pages
-   **Tailwind CSS** for styling the application with utility-first CSS classes

## API Endpoints

### Authentication

-   **POST api/v1/user/signup** - Register a new user
    -   **Request Body**: `{ username: email, password: string, firstName: string, lastName: string }`
    -   **Response**: Returns a JWT token if successful.
-   **POST api/v1/user/signin** - Log in and receive a JWT token
    -   **Request Body**: `{ username: email, password: string }`
    -   **Response**: Returns a JWT token if credentials are valid.

### Account Management

-   **GET api/v1/account/balance** - View account balance (Protected by authMiddleware)
    -   **Response**: `{ balance: number }`
-   **PUT api/v1/user/** - Update account information (Protected by authMiddleware)
    -   **Request Body**: `{ password: string (optional), firstName: string (optional), lastName: string (optional) }`
    -   **Response**: `{ message: "Updated successfully" }`

### Balance Transfer

-   **POST api/v1/account/transfer** - Transfer funds to another user’s account (Protected by authMiddleware)
    -   **Request Body**: `{ amount: number, to: userId }`
    -   **Response**: `{ message: "Transfer successful" }`

### Bulk User Retrieval

-   **GET api/v1/account/bulk** - Retrieve user details with optional filtering by name
    -   **Query Parameters**: `filter` (optional) - filters by first or last name using regex.
    -   **Response**: Array of users with `_id`, `username`, `firstName`, and `lastName`.


## Contact

For any inquiries, reach out to me at [suyashekhande@gmail.com](mailto:suyashekhande@gmail.com).
