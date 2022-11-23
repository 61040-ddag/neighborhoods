# Neighborhoods

Introducing *Neighborhoods*, the newest app on the market pioneering a platform aimed for new family starters to get intimately familiar with potential Neighborhood communities!

## Project Structure

The project is structured as follows:

- `api/index.ts` sets up the backend database connection and Express server. This should actually be in the `server` folder, but it must be here due to a Vercel limitation.
- `server/` contains the backend code
- `client/` contains the frontend code
  - `App.vue` is the root component of your application
  - `main.ts` is the entry point of your application, which initializes Vue
  - `components/` contains the components of the frontend
    - `common/` contains general form components that can be reused across different concepts
  - `public/` contains base HTML files and static assets
  - `router.ts` contains the Vue router
  - `store.ts` contains the Vuex store, which stores application state and persistent data

## Installation
Run `npm install` in your terminal to install local dependencies. Request Team DDAG for the `.env` file to access the MongoDB database.

## Running locally


1. Run `npm run serve`, which compiles the frontend for hot-reloading with webpack and serves it at port `8080`.
2. Open a new terminal (with the original one still open) and run `npm run dev` to start the backend at port `3000`.
3. To view your website, **connect to [localhost:8080](http://localhost:8080)**

Note, Vue proxies any URL it can't resolve on the client side (at port 8080) to the server (to port 3030).

## API routes

#### `GET /`

This renders the `index.html` file that will be used to interact with the backend
#### `GET /api/users/session` - Get the signed in user

**Returns**

- A success message
- An object with currently logged in user's details (without password) or null if not logged in

#### `POST /api/users/session` - Sign in user

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with user's details (without password)

**Throws**

- `403` if the user is already logged in
- `400` if `username` or `password` is not in correct format format or missing in the req
- `401` if the user login credentials are invalid

#### `DELETE /api/users/session` - Sign out user

**Returns**

- A success message

**Throws**

- `403` if user is not logged in

#### `POST /api/users` - Create an new user account

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the created user's details (without password)

**Throws**

- `403` if there is a user already logged in
- `400` if `username` or `password` is in the wrong format
- `409` if `username` is already in use

#### `PATCH /api/users` - Update a user's profile

**Body** _(no need to add fields that are not being changed)_

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the update user details (without password)

**Throws**

- `403` if the user is not logged in
- `400` if `username` or `password` is in the wrong format
- `409` if the `username` is already in use

#### `DELETE /api/users` - Delete user

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
