asu-smart
=========
You need to have node installed. Clone the repo then make sure you have those modules installed globally.
```
npm install -g gulp
npm install -g bower
npm install -g bower-installer
```

If your npm install hangs try using this
```
npm install --registry http://registry.npmjs.org/ -g gulp
npm install --registry http://registry.npmjs.org/ -g bower
npm install --registry http://registry.npmjs.org/ -g bower-installer
```

### Installing Build System

Open the project folder and execute `npm install`. To start the build system use the command `gulp start` it will watch saves to file and compile stylus to css files then concat them. It will also concat the js files and would allow for a livereload when any file changes(stylus,js,html) if you have the plugin installed.


### Installing Livereload plugin for chrome
- Install the chrome plugin from here: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei.
- Enable plugin to access file url by going to `Settings -> Extensions` then serch for the plugin and check `Allow access to file URLs` 
- Now start the build system as described up and then click on the plugin icon this will connect the page with the livereload server.


### Starting the server
To start the server type `node server.js` and head to `localhost:5000`
