/**
 * @fileOverview
 * @name serverComms.js
 * The file contains all the javascript needed to communicate with the Flask and
 * the remote Hestia controller. It needs refactoring and rearchitecturing.
 */

function globalServer() {
    return document.getElementById("serverAddress").value;
}

//Sends an asynchronous request to the webserver, intended to reach a local controller.
function sendRequest(serverAddress, endpoint, method, callback=null, payload={}, errorCallback=null){
    var data = {
        query: serverAddress + endpoint,
        method: method,
        payload: payload
    };
    console.log("Sending request:");
    console.log(data);
    $.ajax({
        url: "/request",
        contentType: "application/json; charset=utf-8",
        type: "post",
        cache: false,
        data: JSON.stringify(data),
        dataType: "json",
        success: callback,
        error: errorCallback
    });
}

//Updates a device activator using an abstracted call to send a request.
function updateDeviceActivator(serverAddress, deviceId, activatorId, newState){
    console.log("Sending request to: "+serverAddress);
    console.log("endpoint: "+"/devices/" + deviceId + "/activators/" + activatorId);
    sendRequest(serverAddress,
        "/devices/" + deviceId + "/activators/" + activatorId,
        "POST",
        function(response){
            console.log("Response from updating device activator.");
            console.log(response);
        });
}

/**
 * This function sends a request to a server to change the state of the
 * activator with activatorId for the device with deviceId.
 * @param {} serverAddress
 * @param {} deviceId
 * @param {} activatorId
 * @param {} state
 */
function changeActivator(serverAddress, deviceId, activatorId, state) {
    sendRequest(serverAddress,
        "/devices/" + deviceId + "/activators/" + activatorId,
        "POST",
        function(resp){
            console.log(resp);
        },
        {
            "state": state
        });
}


/**
 * This is an alias for the dimmers. How we choose to define these functions in
 * the future (e.g. an alias, a direct call, or something else) is subject to
 * change.
 * @param {} serverAddress
 * @param {} deviceId
 * @param {} activatorId
 * @param {} payload
 */
function dimmer(serverAddress, deviceId, activatorId, payload) {
    changeActivator(serverAddress, deviceId, activatorId, payload);
}


/**
 * This is an alias for the toggle switches. How we choose to define these functions in
 * the future (e.g. an alias, a direct call, or something else) is subject to
 * change.
 * @param {} serverAddress
 * @param {} deviceId
 * @param {} activatorId
 * @param {} payload
 */
function toggle(serverAddress, deviceId, activatorId, payload) {
    changeActivator(serverAddress, deviceId, activatorId, payload);
}

/**
 * Gets all devices for a given server. This uses promises as the request is
 * asynchronous. If the promise is not fulfilled it rejects the promise and
 * errors.
 * @param {} serverAddress
 * @returns {} promised json object
 */
function getServerDevices(serverAddress) {
    return new Promise(function(resolve, reject) {
        sendRequest(serverAddress,
            "/devices/",
            "GET",
            resolve,
            {},
            reject);
    });
}

/**
 * Gets all collections available on a Hestia server. This uses a promise.
 * @param {} serverAddress
 */
function getServerCollections(serverAddress) {
    return new Promise(function(resolve, reject) {
        sendRequest(serverAddress,
            "/plugins/",
            "GET",
            resolve,
            {},
            reject);
    });
}

/**
 * Gets all plugins for a specific collection. This uses a promise.
 * @param {} serverAddress
 * @param {} collectionName
 */
function getServerCollectionPlugins(serverAddress, collectionName) {
    return new Promise(function(resolve, reject) {
        sendRequest(serverAddress,
            "/plugins/" + collectionName + "/",
            "GET",
            resolve,
            {},
            reject);
    });
}

/**
 * Gets the info for a particular plugin. This uses a promise.
 * @param {} serverAddress
 * @param {} collectionName
 * @param {} pluginName
 */
function getPluginInfo(serverAddress, collectionName, pluginName) {
    return new Promise(function(resolve, reject) {
        sendRequest(serverAddress,
            "/plugins/" + collectionName + "/plugins/" + pluginName,
            "GET",
            resolve,
            {},
            reject);
    });
}

/**
 * Sends the request to add new device described by payload to the server.
 * Updates the devices list after sending the data.
 * @param {} serverAddress
 * @param {} payload
 */
function postDevice(serverAddress, payload) {
    sendRequest(serverAddress,
        "/devices/",
        "POST",
        null,
        payload);
    updateDeviceList();
}

/**
 * Deletes a device with a given id, and update the devices list.
 * @param {} serverAddress
 * @param {} deviceId
 */
function deleteDevice(serverAddress, deviceId) {
	sendRequest(serverAddress,
		"/devices/"+deviceId,
		"DELETE",
		null,
		{});
	updateDeviceList();
}

/**
 * Renames a device.
 * @param {} serverAddress
 * @param {} deviceId
 * @param {} newName
 */
function renameDevice(serverAddress, deviceId, newName){
	sendRequest(serverAddress,
		"/devices/"+deviceId,
		"PUT",
		null,
		{
			"name": newName
		});
	updateDeviceList();
}
