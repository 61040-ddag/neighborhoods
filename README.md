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
    - `Common/` contains general form components that can be reused across different concepts
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
