/**
 * @fileOverview
 * @name serverComms.js
 * The file contains all the javascript needed to communicate with the Flask and
 * the remote Hestia controller. It needs refactoring and rearchitecturing.
 */

//The most recent json object received by the client.
var LAST_DATA_RECEIVED = null;

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
 * @param {} server
 * @param {} deviceId
 * @param {} activatorId
 * @param {} state
 */
function changeActivator(server, deviceId, activatorId, state) {
    sendRequest(server,
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
 * @param {} server
 * @param {} deviceId
 * @param {} activatorId
 * @param {} payload
 */
function dimmer(server, deviceId, activatorId, payload) {
    changeActivator(server, deviceId, activatorId, payload);
}


/**
 * This is an alias for the toggle switches. How we choose to define these functions in
 * the future (e.g. an alias, a direct call, or something else) is subject to
 * change.
 * @param {} server
 * @param {} deviceId
 * @param {} activatorId
 * @param {} payload
 */
function toggle(server, deviceId, activatorId, payload) {
    changeActivator(server, deviceId, activatorId, payload);
}

/**
 * Gets all devices for a given server. This uses promises as the request is
 * asynchronous. If the promise is not fulfilled it rejects the promise and
 * errors.
 * @param {} server
 * @returns {} promised json object
 */
function getServerDevices(server) {
    return new Promise(function(resolve, reject) {
        sendRequest(server,
            "/devices/",
            "GET",
            resolve,
            {},
            reject);
    });
}

/**
 * Sends the request to add new device described by payload to the server.
 * @param {} server
 * @param {} payload
 */
function postDevice(server, rawpayload) {
    sendRequest(server,
        "/devices/",
        "POST",
        null,
        JSON.parse(rawpayload));
    updateDeviceList();
}


