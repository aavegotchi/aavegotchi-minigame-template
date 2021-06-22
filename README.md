# Aavegotchi minigame template

Preview: https://epic-chandrasekhar-a63ea6.netlify.app

## Getting started

Using the [github client](https://cli.github.com/), in your command line run:
```
gh repo create <minigame-project> --template="https://github.com/aavegotchi/aavegotchi-minigame-template.git"
cd <my-minigame-project>
```

The template is made up of two directories, the *server* and the *app*. The two directories run independently of one another and therefore have their own dependencies.

To run the app, you need to serve both the *server* and the *app* on your local machine. In one terminal run:
```
cd <minigame-project>/server
npm install
npm run start
```

Then inside another terminal run
```
cd <minigame-project>/app
npm install
npm run start
```

Your server by default will run on [http://localhost:443](http://localhost:443) and your app will run on [http://localhost:3000/](http://localhost:3000/).

<p>&nbsp;</p>

## Available Scripts

### In the project app directory, you can run:

* `npm run start`

This will allow you to runs the app in the development mode.

The page will reload if you make edits.\
You will also see any lint errors in the console.

<p>&nbsp;</p>

* `npm run start:offchain`

This will allow you to runs the app in the development mode without the need of a web3 connection, or an owned Aavegotchi

<p>&nbsp;</p>

* `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
<p>&nbsp;</p>


### In the project server directory, you can run:

* `npm run start`

This will allow you to runs the server in the development mode.

The page will reload if you make edits.\
You will also see any lint errors in the console.

<p>&nbsp;</p>

* `npm run start:prod`

This will allow you to runs the server in production mode. Ensure this is command you run when you deploy your server on a virtual machine.

