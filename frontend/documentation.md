At this point we are using Vue with vuex. Vuex is just a extension we use for our data management via a singleton pattern. We configured Vue with tests ... . And with Eslint, which check if the code follows the Airbnb code format(Eslint provides errors if the format does not match).

# How to start
1. Install npm and yarn as suggested in the readme file in the front end directory.
2. Run yarn install once at the beginning.
3. Run yarn start, this runs the project. Probably at localhost:8080, but the port is displayed in the terminal.

# Configuration right now
In the src folder there is the file App.vue which is the container of every page. In this file there is a <router-view> element which is a placeholder for the actual page that is requested via the URL. There also is the main.js file, in this file the Vue instance is created. Meaning that this is the root file of the project.

## ./router
This is the folder of the vue-router. Everything with directing to a new page and loading a page from a URL is done via the vue-router.

## ./store
This is the vuex store folder. We want to fetch all the data from the servers in here. At a page load and after the fetch we load the data from the store to the page. Then at a page interaction/change on the page we want to update the data in the store, then in the store we change the store.state and update this state to the server.
The store has 4 main parameters:
### State; which is basically all the data fields the store has.
We have:
        servers: a list with server addresses, server names, presets. !! Right now the devices are already in the servers data element because of our test data, but as soon as we hook up with the backend this will not be the case anymore!!!
        currentServer: This is the JSON object you would get from a hesia localserver with all the devices installed on that server.

### Actions; this are setter functions for the state
        These functions are actually changing the state. So there should be no direct changes of store data elements.

### Mutations; all asynchronous requests that can be made to the store.
        A mutation is called on an input event, from this mutation we call an action and later on need to update the server.

### Getters; getter functions.
        I have not been using these yet, but we should definitely do so, to make the code more clear.

## ./components
This is the folder where the actual html pages are stored. Each file has a HTML template on top and then as a JavaScript file with export default{ this is where the ‘Vue code’ comes }. These files are not actually pages, they are Vue.components and can be imported in other vue files. So the DeviceGroup file imports the Device.vue file.
Right now we have 2 actual ‘pages’ Home and Server. Home.vue and Server.vue are loaded into App.vue in the browser via the vue-router.

# Todo:
1 I have not paid any attention to css yet. So it looks okay, but it is not close to being Hestia representable.
2 Home.vue and Server.vue both used Sui-cards, but for state management we had to move the Sui-cards out of Server.vue into Device.vue, now the cards in Server.vue are not automatically adaptive any more. I think this is because in DeviceGroup.vue there is the Sui-cardgroup element with the automatic width element call, but there is no direct Sui-card in the card group anymore. Right now there is a Device in the Sui-cardgroup which contains a Sui-card. We need a solution for this.
3 I added a menu in the Server.vue file, with the add device and logout button and a preset select dropdown. The dropdown should have the same appearance as the buttons eventually. 
4 When clicking the add device button a modal is triggered. This modal should contain all the fields necessary to add a device and look good.
5 404 pages
6 Making the fetch requests to the server. I have not looked at the new flask backend yet, so I think it is a good idea to talk this over on Monday 30-04 or Tuesday 1-05
7 There are probably more things, but can't think of them right now.

