# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Requirements:
1. Connect your previous node assignment to this assignment. Create a login
page. Use usernames and passwords created in last assignment to login
successfully. You don’t have to create new user and password(sign up page).
You can manually enter the data in backend and verify that with frontend(i.e.,
Just create login page). Follow REST API folder hierarchy (Server.js should be
entry, router.js, controller.js, service.js, model.js). Refer the folder structure in
attached images.
2. Create 4 pages using react components and react-router (Home, About-us,
Jobs, Contact) as shown in the lab. Make sure to follow separate folder
structure for every component.
3. Add a card component on each page giving detail about each page. (Similar to
the"complex_component_single.htm" example shown in the class and in
folder react scripts uploaded in files). Use react map() to create dynamic
component at least on one of the page.
4. Feel free to use CSS and some additional text to make pages pretty.
5. Upload the assignment on git. Add Readme and gitignore(add node modules
in gitignore) and explain the assignment in readme properly. If readme and
gitignore is missing points will be deducted.

### Map Function used on the Job Page
1. Inside the useEffect() hook, the map() function is used to transform the response.data array of users received from the API. For each user object in the array, a random age property is generated using Math.random() and Math.floor(), and then spread into the user object using the spread syntax ({ ...user, age }). The transformed user objects are then set to the users state using setUsers().

2. Inside the return statement, the map() function is used again to dynamically render the job profiles. For each user object in the users array, a corresponding JSX element is rendered. The user.name, user.email, and user.age properties are accessed and displayed in the rendered JSX, using template literals and JSX syntax. The user._id property is also used as a key prop to uniquely identify each rendered element and optimize performance.

### Requirements Explained 

- The previous node assignment acts as a backend to this assignment. The frontend of the react application connects with the mongodb using the node server displayed in the backend.
- The folder structure is followed as required.
- All 4 pages are created as shown in the lab.
- Card Component is added in each page.
- React Map is used in the Job Page
- Node Modules are removed and .gitignore file is added