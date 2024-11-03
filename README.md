# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# User Management Application

This is a user management application built with React and Chakra UI, allowing administrators to manage user details effectively. The application includes features for adding, editing, and displaying user information.

## Table of Contents

- [Getting Started with Create React App](#getting-started-with-create-react-app)
- [User Management Application](#user-management-application)
  - [Table of Contents](#table-of-contents)
  - [Setup Instructions](#setup-instructions)
  - [Assumptions Made](#assumptions-made)
  - [Libraries/Frameworks Used](#librariesframeworks-used)
  - [Challenges faced](#challenges-faced)

## Setup Instructions

To set up the application locally, follow these steps:

1. **Clone the Repository**
   git clone https://github.com/ARUNRAJKT/Admin.git
   cd admin
2. **Install Dependencies**
   Ensure you have Node.js installed. Then, run the following command to install the necessary packages:
         npm install
   Run the Application To start the application, use:
         npm start
3. **Backend Setup**
    The application expects a backend service running on http://localhost:3000/users.
    Make sure to have your backend set up and running before using the application. 
    You can use a simple JSON server or any backend of your choice.

Access the Application Open your web browser and navigate to http://localhost:3000 to access the user management application

## Assumptions Made

 - The application assumes that the backend service provides a RESTful API for user data.
 - User data includes fields such as name, email, role, createdAt, and updatedAt.
 - The user roles are limited to admin and user.
 - A section will display the logged-in admin's details when they are authenticated.
 - This section will show relevant information, such as their name and role.
 - There will be a logout button in the navigation bar that allows the admin to log out of the application.
 - Upon logging out, the application will clear any session or token storage used for authentication.
 - The name of the logged-in admin will be displayed in the navigation bar while they are authenticated.
 - The application will include error handling for API requests to manage cases like network failures, unauthorized access, and validation errors.
 - The application will indicate loading states when fetching data from the API to enhance user experience.
  
## Libraries/Frameworks Used

React: A JavaScript library for building user interfaces, chosen for its component-based architecture and flexibility.
Chakra UI: A React component library that provides a set of accessible and reusable components, helping to build a modern UI efficiently.
Axios: A promise-based HTTP client for making API requests to the backend, chosen for its simplicity and ease of use.
Chart.js: A JavaScript library for creating charts and graphs, used for visualizing user registration trends.

## Challenges faced

API Response Handling:
Ensuring that API responses were properly managed, especially in terms of error handling, required careful attention. Edge cases like network issues and invalid responses had to be thoroughly tested.

Responsive Design:
Ensuring a consistent look and feel across various devices was challenging, but Chakra UI’s utility-first approach helped streamline this process.

Data Visualization Complexity:
Integrating Chart.js with dynamic data required a good understanding of how to manipulate the data format 

Modal conditional rendering:
Implementing conditional rendering for modals posed some challenges. To streamline the user experience for adding and editing data, I adopted a strategy of creating two separate modals. This approach, while effective, required careful management of state and props to ensure each modal functioned correctly based on user actions.

 -------------------------------------- Thank you---------------------------------------------