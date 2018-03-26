function globalServer() {
    return document.getElementById("serverInput").value;
}

// promises a device
function getDevice(server, deviceId){
    console.log("getDevice() is called");

    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        var url = "/request";

        request.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                result = this.responseText;
                obj = JSON.parse(result);

                if(obj) {
                    resolve(obj);
                } else {
                    let error = new Error('Could not fetch device');
                    reject(error);
                    return;
                }
            }
        };

        // builds corresponding device id
        fullDeviceId = server + "/devices/" + deviceId;

        var data = {
            // add deviceId below to get specific device
            "query" : fullDeviceId,
            "method" : "GET"
        };

        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(data));
    });
};


function changeActivator(server, deviceId, activatorId, state){
    var request = new XMLHttpRequest();
    var url = "/request";

    var data = {
        "query" : server + "/devices/" + deviceId + "/activators/" + activatorId,
        "method" : "POST",
        "payload" : {"state" : state}
    };

    console.log(data);

    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
}


function dimmer(server, deviceId, payload){
    var request = new XMLHttpRequest();
    var url = "/request";

    var device = getDevice(server, deviceId);

    device.then(result => {
        console.log(JSON.stringify(result));
        var activatorFloat = result.activators[1];

        changeActivator(server, deviceId, activatorFloat.activatorId, payload);

    })
        .catch(err => {
            console.log(err);
        });
}


function toggle(server, deviceId){
    var request = new XMLHttpRequest();
    var url = "/request";

    var device = getDevice(server, deviceId);

    device.then(result => {
        console.log(JSON.stringify(result));
        var activatorBool = result.activators[0];
        var payload = !(activatorBool.state);

        console.log('payload:' + payload);
        changeActivator(server, deviceId, activatorBool.activatorId, payload);

    })
        .catch(err => {
            console.log(err);
        });
};


function getServerDevices(){
    var request = new XMLHttpRequest();
    var url = "/request";

    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            result = this.responseText;
            obj = JSON.parse(result);
            document.getElementById("resultArea").innerHTML = JSON.stringify(obj, undefined, 2);
        }
    };

    var data = {
        "query" : "https://94.212.164.28:8000/devices/",
        "method" : "GET"
    };

    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
};


function sendRequest(){
    var request = new XMLHttpRequest();
    var url = "/request";

    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            result = this.responseText;
            obj = JSON.parse(result);
            document.getElementById("resultArea").innerHTML = JSON.stringify(obj, undefined, 2);
        }
    };

    var data = {
        "query" : document.getElementById("queryInput").value,
        "method" : document.getElementById("methodInput").value
    };

    var payload = document.getElementById("payloadInput").value;
    if (payload){
        console.log("Payload is not empty.");
        console.log(payload);
        data["payload"] = JSON.parse(payload);
    }

    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
};
