function displaySignIn(){
	document.getElementById("firebaseui-auth-container").setAttribute("display", "block");
	var container = document.getElementById("container");
	container.setAttribute("background-color", "black");
	container.setAttribute("opacity", "0.25");
}

function hideSignIn(){
	document.getElementById("firebaseui-auth-container").setAttribute("display", "none");
	var container = document.getElementById("container");
	container.setAttribute("background-color", "FFF");
	container.setAttribute("opacity", "1");
}

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

function showAuth(){
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
displaySignIn();
}

function signout(){
firebase.auth().signOut().then(function(){
	console.log("Signed out.");
}, function(error){
	console.log("Error while signing out.");
});
}

initFirebase();

//Check if the user is authenticated.
firebase.auth().onAuthStateChanged(function(currentUser){
if (currentUser){
	//user is logged in.
	console.log("User logged in:"+currentUser.displayName);
} else {
	//user is not logged in, prepare a sign-in popup.
	showAuth();
}
});