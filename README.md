## Login And Register using MEAN Stack

If you think this source code is useful, it will be great if you just give it star.

# Quick Start for Server

**Clone the repository**<br/>
`https://github.com/codingxperience/mean-login-register.git`

**Go inside the directory**<br/>
`cd mean-login-register/server`

**Install dependencies**<br/>
`npm install`

**Start development server**<br/>
`nodemon server.js`

# Quick Start for Client

**Go inside the directory**<br/>
`cd mean-login-register/client`

**Install dependencies**<br/>
`npm install`

**Start development server**<br/>
`ng serve`

# Development server
Run ng serve for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Build
Run ng build to build the project. The build artifacts will be stored in the `dist/` directory. Use the -prod flag for a production build.

# Database jwt Configration for server
Global variables such as mongodb url can be set in `server/config/database.config.js`
You can be change jwt secret in `server/config/jwt.config.js`

**Restful API**<br/>
An api with the following routes
```
POST    /users/registerMe
POST    /users/loginMe
GET     /users/usersMe
GET     /users/current
GET     /users/:id
PUT     /users/:id
DELETE  /users/:id
```
