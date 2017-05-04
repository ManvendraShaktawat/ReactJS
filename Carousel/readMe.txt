Steps for creating boilerplate:

1. Install node and npm
2. Install babel
	- npm install -g babel
	- npm install -g babel-cli
3. Create a local directory and move into that directory
4. Create package.json file
	- npm init (use a unique name and set version to 1.0.0)
5. Install webpack
	- npm install webpack --save
	- npm install webpack-dev-server --save
6. Install react
	- npm install react --save
	- npm install react-dom --save
7. Install Babel Pluggins
	- npm install babel-core
	- npm install babel-loader
	- npm install babel-preset-react
	- npm install babel-preset-es2015
8. Manually Create 4 files
	- webpack.config.js (copy the code as in)
	- index.html (copy the code as in)
	- App.jsx (copy the code as in)
	- main.js (copy the code as in)
9. Open package.json and 
	- delete from scripts object: "test": "echo \"Error: no test specified\" && exit 1"
	- add in scripts object: "start": "webpack-dev-server --hot"
10. 