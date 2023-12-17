# AdminDashboard-backend

## Technologies Used

Here are some of the key technologies and libraries used in this project:

![Node.js](https://img.shields.io/badge/Node.js-14-green) ![Express.js](https://img.shields.io/badge/Express.js-4.18-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-4.4-lightgreen) ![Mongoose](https://img.shields.io/badge/Mongoose-7.4-orange) ![Bcryptjs](https://img.shields.io/badge/Bcrypt-5.1-purple) ![Cloudinary](https://img.shields.io/badge/Cloudinary-1.40-brightgreen) ![Joi](https://img.shields.io/badge/Multer%20Storage%20Cloudinary-4.0-navy) ![Nanoid](https://img.shields.io/badge/Nanoid-3.3.4-orange) ![Nodemailer](https://img.shields.io/badge/Nodemailer-6.9-moccasin) ![CORS](https://img.shields.io/badge/CORS-2.8-indigo) ![Cross-env](https://img.shields.io/badge/Cross--env-7.0-palevioletred) ![Dotenv](https://img.shields.io/badge/Dotenv-16.3-skyblue)

## Requirements

Before getting started with the project, make sure you have the following tools installed on your computer:

- Node.js (version 12 or higher)

## Installation

1. Clone this repository to your local computer.
2. Open the terminal and navigate to the root folder of the project.
3. Run the command `npm install` or `yarn` to install project dependencies.

## Configuration

1. Create a .env file in the project's root folder, based on the .env.example file.
2. Specify the necessary environment variables in this file.

## Server Commands

**npm:**

- `npm start` — Start the server in production mode.
- `npm run start:dev` — Start the server in development mode.
- `npm run lint` — Run code linting using eslint. Perform this before each PR and fix all linting errors.
- `npm run lint:fix` — Similar to lint command, but automatically fixes simple linting errors.

**yarn:**

- `yarn start` — Start the server in production mode.
- `yarn start:dev` — Start the server in development mode.
- `yarn lint` — Run code linting using eslint. Perform this before each PR and fix all linting errors.
- `yarn lint:fix` — Similar to lint command, but automatically fixes simple linting errors.

## API Documentation

For detailed descriptions of API requests and interactions, run this project end open Live Server page in browser.

## Project API Queries

https://slavska.github.io/AdminDashboard-backend/api <<BASE_URL>>

BASE_URL/user/signup <<registration>>

BASE_URL/user/login <<login>>

BASE_URL/user/logout <<logout>>

BASE_URL/user/current <<current>>

BASE_URL/dashboard/ <<get all DASHBOARDS>>

