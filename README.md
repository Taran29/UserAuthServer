This is the webserver for my User Authentication app. Frontend -> <a href="https://github.com/Taran29/UserAuthApp">here</a>

<a href="https://user-auth-taran29.netlify.app/home">Deployed Website Link</a>

This webserver was made using Express.js<br><br>
It has one <b>data model: User.js</b>, which is created using Mongoose. Data validation (using Joi) and JWT authentication token generation (using jsonwebtoken) happen on the instance of this model. It's a very basic model with only 5 fields: name, email, password (hashed), securityQuestion, and securityAnswer (hashed).

It has one <b>middleware: auth.js</b>. Its job is to protect certain routes from unauthorised users. It checks the incoming request for the authentication token provided at login/signup. If it finds the token, it attaches the payload to the request object and goes to the next middleware in the pipeline. Else, it sends a 401 Unauthorised response back to the client.

It has four main <b>route handlers</b>: 
1. register.js<br>
   It handles registering new users by validating the incoming request object using the package 'Joi', hashes the incoming password and security question's answer, and then creates a new user on MongoDB. Generates an auth token using the instance of User mongoose model, attaches the incoming token to a response header and sends relevant user information back to the client in the body.
  
2. login.js<br>
   It handles logging in existing users. First, it checks if the user exists, and then it checks if the password is correct. If both of those qualify, then again, authentication token is generated using User model instance, and relevant user information is sent back to the client.
   
3. forgotPassword.js<br>
   It has three routes:
   1. The first route is a GET request which takes in user email as a request parameter, then checks if the user exists, and returns the security question that the user had entered.
   2. The second route is a POST request which validates incoming answer from the client with the hashed answer already stored on the server using bcrypt. If the answer is correct, it generates a new JWT, called the x-forgot-password-token, attaches it to the response header, and sends a success message back to the client.
   3. The third route is also a POST request, which handles updating the password on MongoDB. It validates the incoming password, checks for x-forgot-password-token in the request headers. If both of those qualify, it hashed the incoming password and updates it on MongoDB.
   
4. updateName.js<br>
   It handles updating the name of existing users. It uses the middleware "auth.js" before executing its own function. If auth succeeds, then it atomically updates the name on MongoDB.
