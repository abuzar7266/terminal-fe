# Terminal Application README

Welcome to the README for the Terminal Application, a web application developed in Next.js. This document will provide you with the necessary instructions to set up and run the application in development mode, an overview of its code structure, and additional information about its deployment.

## Getting Started

To run this application in development mode, please follow these steps:

1. **Clone the Repository:**
   Clone this project from the repository, and navigate to the project root directory.

2. **Install Dependencies:**
   Open a terminal within the project root directory and run the following command to install all the required dependencies: npm install

3. **Start the Development Server:**
After the dependencies are installed, start the application's development server with the following command: npm run dev


4. **Environment Variables:**
An environment variable file named `.env.local` is provided inside the repository for convenience. This file contains necessary environment values. However, please note that it is not a standard practice to include environment variables in the repository. You can replace these values with your own if desired.

## Code Structure

The code for the Terminal Application is structured as follows:

1. **api:** This directory contains functions prepared to make API calls using Axios, and API routes are defined here.

2. **components:** This directory contains component files that are used throughout the pages of the application.

3. **containers:** Containers combine components using the container pattern for state management. It uses Redux for state management, including `mapStateToProps` and `mapDispatchToProps`.

4. **config:** This directory includes helper functions, data files, constants, and interfaces used throughout the application.

5. **Pages:** All of the application's pages are located in this directory. There is no separate router file because Next.js provides dynamic routing.

6. **store:** This directory contains all the actions, types, reducers, and sagas that help create global state management within the application.

## Deployment

The application has been deployed on Vercel and is accessible at the following URL:

[Terminal Application on Vercel](https://terminal-fe.vercel.app)

Please note that the backend of the application is currently deployed on an EC2 instance. However, there are known issues with its outbound and inbound configuration. While the backend works with Postman, it does not function correctly with the connected app. To verify the application's functionality, it is recommended to run it in development mode as instructed earlier.

Thank you for using the Terminal Application! If you have any questions or encounter any issues, please feel free to reach out to the development team.




