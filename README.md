# Aavegotchi minigame template

The official Aavegotchi minigame template. This template allows you to create your own Aavegotchi minigames without any prior knowledge of web3. A basic understanding of Javascript and Typescript is necessary.

![Screenshot 2021-06-22 at 16 14 35](https://user-images.githubusercontent.com/44173285/122954387-4c52dd00-d377-11eb-9e8d-3f76e064062c.png)

The template includes both the *app* and *server* directories. The *app* consists of [Phaser3](https://phaser.io/phaser3) with a [React](https://reactjs.org/) wrapper. Phaser is a 2D game framework used for making HTML5 games for desktop and mobile. React is used for an intuitive main menu UI, as well as giving access to custom hooks for a more smooth Web3 / Aavegotchi integration.

The *server* consists of *nodejs* and *express* and it utilises [socket.io](https://socket.io/) to enable web socket functionality within the game. This is necessary to enable multiplayer. However it is also required for single player games, as it allows for server side logic to prevent people using client side dev tools to intercept and send false data to your games leaderboard (If you have one set up that is).


## Getting started

Using the [github client](https://cli.github.com/), in your command line run:
```
gh repo create <minigame-project> --template="https://github.com/aavegotchi/aavegotchi-minigame-template.git"
cd <my-minigame-project>
git pull origin main
```

The template is made up of two directories, the *server* and the *app*. The two directories run independently of one another and therefore have their own dependencies.

If on **Windows** you will need to update both `package.json`'s with the following:
```diff
  // app/package.json

  "scripts": {
    ...
-   "start:offchain": "REACT_APP_OFFCHAIN=true react-scripts start",
+   "start:offchain": "set REACT_APP_OFFCHAIN=true && react-scripts start",
    ...
  },
```

```diff
  // server/package.json

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
-   "start:prod": "NODE_ENV=production nodemon server.ts",
+   "start:prod": "set NODE_ENV=production && nodemon server.ts",
-   "start": "NODE_ENV=development nodemon server.ts"
+   "start": "set NODE_ENV=development && nodemon server.ts"
  },
```

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

#### `npm run start`

This will allow you to runs the app in the development mode.

The page will reload if you make edits.\
You will also see any lint errors in the console.

<p>&nbsp;</p>

#### `npm run start:offchain`

This will allow you to runs the app in the development mode without the need of a web3 connection, or an owned Aavegotchi

<p>&nbsp;</p>

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
<p>&nbsp;</p>


### In the project server directory, you can run:

#### `npm run start`

This will allow you to runs the server in the development mode.


<p>&nbsp;</p>

#### `npm run start:prod`

This will allow you to runs the server in production mode. Ensure this is command you run when you deploy your server on a virtual machine.

