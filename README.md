# Blog App

This is a Blog App with frontend and backend using the MERN tech stack.

## How it Looks

### Register Page

![Screenshot_8](https://github.com/varshaa-t/Blog-App/assets/60147227/dcd69af8-b1e8-46db-ac86-a4f33868e9eb)

### Login Page

![Screenshot_9](https://github.com/varshaa-t/Blog-App/assets/60147227/c6df4047-e7dc-4519-872b-d1658b5338e7)

### Home Page

![Screenshot_10](https://github.com/varshaa-t/Blog-App/assets/60147227/5e8180b6-671f-43e0-bf66-a8ed43580508)

### Home Page after login

![Screenshot_11](https://github.com/varshaa-t/Blog-App/assets/60147227/79062f02-aac7-49c6-877d-9206ee88ebc4)

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
