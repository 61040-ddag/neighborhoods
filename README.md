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

#### `GET /api/neighborhoods?name=name&city=city&state=state` 

**Returns**
- A success message
- An object with the neighborhood

**Throws**

- `400` if `name`, `city` or `state` is not given
- `403` if user is not logged in
- `404` if `name`, `city`, `state` of a neighborhood is not a recognized neighborhood

#### `GET /api/neighborhoods/location?city=city&state=state` 

**Returns**
- A success message
- An array of neighborhoods in a city, state

**Throws**

- `400` if `city` or `state` is not given
- `403` if user is not logged in

#### `GET /api/neighborhoods?lat1=lat1&long1=long1&lat2=lat2&long2=long`

**Returns**
- A success message
- An array of neighborhoods within latitude1, longtitude1, latitude2, longtitude2

**Throws**
- `403` if user is not logged in
- `400` if any of `lat1`, `lat2`, `long1`, and `long2` are invalid

#### `POST /api/neighborhoods/`

**Body**

- `name` _{string}_ - The name of the neighborhood
- `city` _{string}_ - The city of the neighborhood's location
- `state` _{string}_ - The state of the neighborhood's location
- `latitude` _{string}_ - The latitude of the neighborhood's location
- `longtitude` _{string}_ - The longtitude of the neighborhood's location
- `crimeRate` _{string}_ - The crime rate in the neighborhood
- `averagePrice` _{string}_ - The average price of a home in the neighborhood
- `averageAge` _{string}_ - The average age of the residents in the neighborhood

**Returns**

- A success message
- An object with the created neighborhood

**Throws**
- `400` if any neighborhood information provided is in the wrong format
- `401` if user making the request is not the admin
- `403` if user is not logged in
- `409` if neighboorhood already exists

#### `PATCH /api/neighborhoods?name=name&city=city&state=state`

**Body**

- `crimeRate` _{string}_ - The new crime rate in the neighborhood
- `averagePrice` _{string}_ - The new average price of a home in the neighborhood
- `averageAge` _{string}_ - The new average age of the residents in the neighborhood

**Returns**

- A success message
- An object with the updated neighborhood

**Throws**
- `400` if `name`, `city` or `state` is not given
- `400` if any updated neighborhood information is in the wrong format
- `401` if user making the request is not the admin
- `403` if user is not logged in
- `404` if `name`, `city`, `state` of a neighborhood is not a recognized neighborhood

#### `DELETE /api/neighborhoods?name=name&city=city&state=state`

**Returns**

- A success message

**Throws**
- `400` if `name`, `city` or `state` is not given
- `401` if user making the request is not the admin
- `403` if user is not logged in
- `404` if `name`, `city`, `state` of a neighborhood is not a recognized neighborhood

#### `GET /api/reviews/neighborhoods?name=name&city=city&state=state`

**Returns**

- An array of reviews of a neighborhood with `name`, `city`, `state`

**Throws**

- `400` if `name`, `city` or `state` is not given
- `403` if the user is not logged in
- `404` if `name`, `city`, `state` of a neighborhood is not a recognized neighborhood

#### `GET /api/reviews/authors?author=username`

**Returns**

- An array of reviews created by user with username `author`

**Throws**

- `400` if `author` is not given
- `403` if the user is not logged in
- `404` if `author` is not a recognized username of any user

#### `POST /api/reviews`

**Body**

- `neighborhoodId` _{string}_ - The id of the location of the review
- `rating` _{string}_ - The rating of the review
- `content` _{string}_ - The content of the review

**Returns**

- A success message
- A object with the created review

**Throws**

- `400` if the review `content` is empty or a stream of empty spaces
- `400` if the review `rating` is not a number or between 0 and 10
- `403` if the user is not logged in
- `413` If the review `content` is more than 4096 characters long

#### `DELETE /api/reviews/:reviewId?`

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the author of the review
- `404` if the `reviewId` is invalid

#### `GET /api/certifiedResidency/isCertified?user=username&neighborhoodId=neighborhoodId`

**Returns**

- A boolean on whether or not a user is a resident of neighborhood

**Throws**

- `400` if user is not given or neighborhoodId is not given
- `403` if the user is not logged in
- `404` if no user has given username or neighborhoodId of a neighborhood is not a recognized neighborhood

#### `GET /api/certifiedResidency/users?user=username`

**Returns**

- An array of neighborhoods an user is a resident in

**Throws**

- `400` if neighborhoodId is not given
- `403` if the user is not logged in
- `404` neighborhoodId of a neighborhood is not a recognized neighborhood


#### `POST /api/certifiedResidency`

**Body**

- `name` _{string}_ - The name of the neighborhood
- `city` _{string}_ - The city of the neighborhood's location
- `state` _{string}_ - The state of the neighborhood's location

**Returns**

- A success message
- The created certifiedResidency

**Throws**

- `400` if any neighborhood information provided is in the wrong format
- `403` if the user is not logged in
- `409` if neighborhood already exists

#### `DELETE /api/certifiedResidency/:certifiedResidencyId?`

- A success message

**Throws**

- `403` - If the user is not logged in
- `404` - If the certifiedResidencyId is not valid

#### `POST /api/vibeCheck/interviews`

#### `POST /api/vibeCheck/availability`

#### `DELETE /api/vibeCheck/availability/:dateTime?`

#### ` GET /api/strolls/authors?author=username`

**Returns**

- A success message
- An array of strolls of belonging to user with username

**Throws**

- `400` - if author is not given
- `403` - if the user is not logged in
- `404` - if no user has given author


#### `GET /api/strolls/neighborhoods?name=name&city=city&state=state`

**Returns**

- A success message
- An array of strolls of strolls of the neighborhood with name city and state

**Throws**

- `400` if name, city or state is not given
- `403` if the user is not logged in
- `404` if name, city, state of a neighborhood is not a recognized neighborhood


#### `POST /api/strolls`

**Body**

- `neighborhoodId` _{string}_ - The id of the neighborhood of the stroll
- `strollVideo` _{string}_ - the link of the stroll video to the firebase storage
- `title` _{string}_ - the title of the stroll


**Returns**

- A success message
- An object with the created stroll

**Throws**

- `403` - if the user is not logged in
- `404` - if no neighborhood with neighborhoodId exists
- `400` - if title of stroll or videoStroll is not properly formatted string

#### `DELETE /api/strolls/:strollId?`

**Returns**

- A success message

**Throws**

- `403` - If the user is not logged in
- `404` - If the strollId is not valid