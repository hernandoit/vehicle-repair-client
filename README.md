[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# vehicle-repair-client
This is the Express API to our vehicle repair app.

This app will allow a user to add their `vehicle` and add a `ticket` for service repairs to be done.  This is a way for the user to keep track of what services have been done to their vehicle.

## `Setup Steps`
1. Fork and clone this repository into your projects location 
   - `git clone git@github.com:<your github account name here>/react-material-design.git`
2. Create a new branch, and name it after your project. 
2. Checkout to your newly created branch.
   - `git checkout -b <your projects name here>`
4. Install dependencies with ```npm install```.

## `Important Links`
[Deployed Client](https://hernandoit.github.io/vehicle-repair-client/)

[Deployed Server](https://salty-river-98460.herokuapp.com/)

[Client Repo](https://github.com/hernandoit/vehicle-repair-client)

[Server Repo](https://github.com/hernandoit/express-api-vehicle-repair)


## `Planning Story`

#### `Auth Specifications`
 - Signup with email, password, and password confirmation.
 - Login with email and password.
 - Logout when logged in.
 - Change password with current and new password.
 - Signup and Signin must only be available to not signed in users.
 - Logout and Change password must only be available to signed in users.
 - Give feedback to the user after each action's success or failure.
 - All forms must clear after submit success and user sign-out
 - (Optional) Reset form to initial state on failure

#### `Client Specifications`
 - Use a front-end Javascript app to communicate with your API (both read and write) and render data that it receives in the browser.
 - Have semantically clean HTML and CSS
 - User must be able to create a new resource
 - User must be able to update a resource
 - User must be able to delete a resource
 - User must be able to view a single or multiple resource(s)
 - All resource actions that change data must only be available to a signed in user.
 - Give feedback to the user after each action's success or failure.
 - All forms must clear after submit success or failure
 - Protect against Cross-site Scripting

#### `API Specifications`
 - Use Express or Django to build an API.
 - Create at least 4 RESTful routes for handling GET, POST, PUT/PATCH, and DELETE requests for a resource other than User.
 - Have at least 1 resource that has a relationship to User
 - Any actions which change data must be authenticated and the data must be "owned" by the user performing the change or a user determined by an access control list
#### `User stories`
**Auth**
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
**Car**
- As a signed in user, I would like to add my vehicles information.
- As a signed in user, I would like to create a service ticket for my vehicle(s) 
based on the service(s) I choose.
**Ticket**
- As a signed in user, I would like to see the service ticket(s) I have created.
- As a signed in user, I would like to update or delete my service ticket(s).
- As a signed in user, I would like to know if the service(s) have been complete.


#### `Technologies Used`
- GitHub
- Express
- Bootstrap
- React
- Node

#### `Unsolved Problems`
1. I would like to have clients be able to add more services to an invoice.
2. would like to add a parts schema.

## `Images`
ERD
![ERD](https://i.imgur.com/YJj5bCe.png)