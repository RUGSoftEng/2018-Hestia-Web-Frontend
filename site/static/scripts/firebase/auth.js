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
	}, function(error){
		console.log("Error while signing out.");
	});
}

//Function to call to start the authorization process. This should be done after the page loads.
function beginAuth(){
	initFirebase();

	waitForLogin().then(user =>{
		console.log("User is logged in: "+user.displayName);
	}).catch(err =>{
		console.log(err);
		window.location.replace("login.html");
	});
}