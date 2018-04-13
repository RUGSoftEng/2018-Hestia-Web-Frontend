

//Adds a server to the list of servers.
function addUserServer(firebase, user, serverName, serverAddress){
	firebase.database().ref('users/'+user.uid+'/'+serverName).set({
		address: serverAddress
	});
}

//Gets all servers from the firebase database, and can be used via the function provided.
//Returns a promise for when the data is received.
function getUserServers(firebase, user){
	var userRef = firebase.database().ref('users/'+user.uid);
	return new Promise(function(resolve, reject){
		userRef.on('value', function(snapshot){
			resolve(snapshot.val());
		}, function(error){
			console.log("Error: "+error.code);
			reject(error);
		});
	});
}

//Deletes a server from a user's list of servers.
function deleteUserServer(firebase, user, serverName){
	firebase.database().ref('users/'+user.uid+'/'+serverName).remove();
}