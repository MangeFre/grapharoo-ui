# grapharoo-ui
The UI of the grapharoo project

# How to run it

## Tools and short explanation

Ok, here is a thoughtful breakdown.
The application uses two very common tools, Babel and Webpack. If my understanding is correct, Webpack is a bundler - it bundles all of our components, function etc into one javascript file called bundle.js. As we move along, we can even have Webpack bundle our code into "chunks", so we don't have to deliver all of our javascript everything we get a request from the server, but that is for later.

Webpack itself does not really know how to read / transpile JSX and Javascript. It instead relies on "loaders" to help Webpack with that. We use one of the most popular loaders out there - Babel. Babel is configured with a .babelrc file which can be found in the root directory. Webpack is configured by a webpack.config.js file, also in the root directory. You can glance at them to get a feel for what they do - basically, they just contain settings.

## Starting development

To develop in the app, just type in:

npm install (if you haven't done this already)
npm run dev

in your terminal. Dev will run webpack in development mode. It opens up a server that serves all the files straight from memory (you will not see the bundle.js file be created in the dist folder). It also enables HMR - Hot Module Replacement. If you haven't seen that before, it basically allows for instant updates from your code onto your server. Just leave your terminal running webpack as you code, and all your changes will be updated in the browser in an instant (as long as you save them!).

## Building the actual bundle

If you want to see what the bundle looks like, you can run:

npm run build

to create the actual javascript bundle that would be served to a client. It's moslty gibberish though.