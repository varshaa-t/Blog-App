# Blog App

This is a Blog App with frontend and backend using the MERN tech stack.

## Setup the Project Locally

- Clone the repository by running: git clone https://github.com/varshaa-t/Blog-App.git

- Go to the project folder using an IDE of your preference.

- In the "api" folder, create a .env file. To the file:

  - Add a link to your MongoDB DataBase:
    mongoDBURL = "Your URL"
  
  - Add a secret for jsonwebtoken authentication:
    secret = "Your secret"

- Open a terminal in the project folder and run the following commands:
  ```
  cd api
  npm install
  nodemon index.js

  #OR

  cd api
  npm install
  node index.js
  ```

- Open another terminal and run: cd client

  Now run: 
  ```
  npm install vite --save-dev

  #OR

  yarn add vite --dev
  ```

- In the same folder, run: 
  ```
  npm run dev

  #OR

  yarn dev
  ```

- Click on the link and you get your own Blog App! You can now Register, Login and create your own blog posts!

## Technologies Used

- HTML
- CSS
- JavaScript
- NodeJS
- Express
- React
- MongoDB
- Zod