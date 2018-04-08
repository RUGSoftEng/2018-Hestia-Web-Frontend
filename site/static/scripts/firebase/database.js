//Adds a server to the list of servers.
function addUserServer(firebase, user, serverName, serverIp, serverPort){
	firebase.database().ref('users/'+user.uid+'/'+serverName).set({
		ip: serverIp,
		port: serverPort
	});
}

//Gets all servers from the firebase database, and can be used via the function provided.
//onDataReceived allows only one type of 
function getUserServers(firebase, user, onDataReceived){
	var userRef = firebase.database().ref('users/'+user.uid);
	userRef.on('value', function(snapshot){
		onDataReceived(snapshot.val());
	}, function(error){
		console.log("Error: "+error.code);
	});
}

//Deletes a server from a user's list of servers.
function deleteUserServer(firebase, user, serverName){
	firebase.database().ref('users/'+user.uid+'/'+serverName).remove();
}