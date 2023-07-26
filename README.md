
  # Project Name - Blood Bank Application

  # Dev Dependencies installed in this project:-
   - eslint
   - prettier
   - nodemon

  # Dependencies installed in this project:-
   - express
   - mysql2
   - dotenv
   - bcrypt
   - joi
   - jsonwebtoken
   - sequelize
  
 
  # In the project directory you can run:
    npm install or npm i

   # In src directory you can run migration commands at first-time : (Only once)
    npx sequelize-cli db:migrate

    After that run seed command:

    npx sequelize-cli db:seed:all 
    // (default superUser created [email: su.superuser@gmail.com, password: Super@1234] )
   
  # Run the project development mode:-
     npm run dev

  # Use Token:-
   When user login, token generated for user, check console after login.
   When use put, patch, delete request methods use generated token for user.
   In postman fill generated token in header.

    