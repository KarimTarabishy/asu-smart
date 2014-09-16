asu-smart
=========
You need to have node installed. Clone the repo then make sure you have those modules installed globally.
```
npm install -g gulp
npm install -g bower
npm install -g bower-installer
```

### Installing Build System

Open the project folder and execute `npm install`. To start the build system use the command `gulp start` it will watch saves to file and compile stylus to css files then concat them. It will also concat the js files and would allow for a livereload when any file changes(stylus,js,html) if you have the plugin installed.

### Installing Livereload plugin for chrome
- Install the chrome plugin from here: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei.
- Enable plugin to access file url by going to `Settings -> Extensions` then serch for the plugin and check `Allow access to file URLs` 
- Now start the build system as described up and then click on the plugin icon this will connect the page with the livereload server.




