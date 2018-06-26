# Recipe Puppy - Home Exercise

Just `run npm install` and `npm start`, then go to localhost:3003 and your'e good to go :)
To build, run `npm run build`, and to debug run `npm run debug`, then go to localhost:1234 for the minified production bundle.

## Initial Usage / Installation
1. Install node.js
2. `npm install`
3. `npm start`
4. Navigate to `http://localhost:3003`

## Build for production
1. `npm run build`
2. Navigate to `http://localhost:1234` (for the minified production bundle)

## Debug in production
1. `npm run debug`
2. Navigate to `http://localhost:1234` (for the un-minified production bundle)

## Async component loading
Components are now loaded async with react-router-loader and the store is injected via MobX Provider.

## Material-UI design
This projects relays on Metarial-UI components library for general design concepts and edit controls

##Use
Type your search term on order to get the first 20 results from the Recipe Puppy server.
Note: When you use ',' within your term the REST call will issue an ingredients query otherwise it will be a title query