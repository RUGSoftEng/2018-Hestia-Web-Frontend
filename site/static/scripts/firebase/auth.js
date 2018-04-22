//Initialization function, to be done at every page load.
function initFirebase(){
	var config = {
		apiKey: "AIzaSyAJzJqrgr5aX3IIaIVO0IYTNfYmStFwsI0",
		authDomain: "hestia-web-2018.firebaseapp.com",
		databaseURL: "https://hestia-web-2018.firebaseio.com",
		projectId: "hestia-web-2018",
		storageBucket: "hestia-web-2018.appspot.com",
		messagingSenderId: "971236925335"
	};
	firebase.initializeApp(config);
}

//Initializes the login ui, and links it with a div with the id: firebaseui-auth-container.
function initLoginUi(){
	initFirebase();
	// FirebaseUI config.
	var uiConfig = {
		signInFlow: 'popup',
		signInSuccessUrl: 'index.html',
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		// Terms of service url.
		tosUrl: 'settings.html'
	};

	// Initialize the FirebaseUI Widget using Firebase.
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	// The start method will wait until the DOM is loaded.
	ui.start('#firebaseui-auth-container', uiConfig);
}

//Promises to check login status, and either the user is logged in, or is not.
function waitForLogin(){
	return new Promise(function(resolve, reject){
		firebase.auth().onAuthStateChanged(function(currentUser){
			if (currentUser){//User has logged in successfully.
				resolve(currentUser);
			} else {//User is not logged in.
				reject("Not logged in.");
			}
		});
	});
}

//Signs out a logged in user.
function signout(){
	firebase.auth().signOut().then(function(){
		console.log("Signed out.");
		window.location.replace("login.html");
	}, function(error){
		console.log("Error while signing out.");
	});
}

//Function to call to start the authorization process. This should be done after the page loads.
function beginAuth(){
	initFirebase();

	return new Promise(function(resolve, reject){
		waitForLogin().then(user =>{
			console.log("User is logged in: "+user.displayName);
			resolve(user);
		}).catch(err =>{
			console.log(err);
			reject(err);
			window.location.replace("login.html");
		});
	});
}