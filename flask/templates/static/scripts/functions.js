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

    console.log("YEAH " + deviceId);
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


function toggle(server, deviceId, activatorId, payload){
    changeActivator(server, deviceId, activatorId, payload);
};


function getServerDevices(server){
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

        var data = {
            "query" : server + "/devices/",
            "method" : "GET"
        };

        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(data));
    });
}


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


//Removes all children from an element.
function removeChildren(node){
    if (node) {
        while(node.firstChild){
            node.removeChild(node.firstChild);
        }
    }
}

//Gets a device object by id from some data.
function getDeviceById(id){
    for (var i = 0; i < array.length; i++){
        if (array[i].deviceId == id){
            return array[i];
        }
    }
    return null;
}

//Populates the list of devices from some data received from the server.
//  data is a list of devices as received from the server.
function populateDevices(data){
    array = data;
    var namesListElem = document.getElementById("deviceNamesList");
    removeChildren(namesListElem);

    //Insert placeholder in temporary payload input to add devices
    var inputPlaceholder = '{\n "plugin_name": "light",\n "collection": "mock",\n "required_info": {\n   "ip": "123",\n   "port": "456",\n   "name": "not_a_kitchen_light"\n  }\n}';
    document.getElementById("payload_input").placeholder = inputPlaceholder;

    console.log(data);
    data.forEach(function(device){
        console.log(device.name);
        var elem = document.createElement("li");
        elem.className="device_row";
        elem.id = device.deviceId;
        elem.onclick = function() {
            var children = namesListElem.children;
            for (var i = 0; i < children.length; i++){
                children[i].className = "device_row";
            }
            elem.className = "device_row active";

            var dev = getDeviceById(elem.id, data);

            viewDeviceActivators(dev.name, dev.deviceId, dev.activators);
        };

        elem.appendChild(document.createTextNode(device.name));
        namesListElem.appendChild(elem);
    });

    namesListElem.firstChild.click();
}

//Updates the device's activators module.
function viewDeviceActivators(deviceName, deviceId, activators){
    var activatorsElem = document.getElementById("activatorsList");
    var activatorsTitle = document.getElementById("activatorsTitle");
    activatorsTitle.firstChild.innerHTML = deviceName;
    removeChildren(activatorsElem);
    for (var i = 0; i < activators.length; i++){
        var activator = activators[i];
        var elem = document.createElement("div");
        elem.className = "device_control_row";
        elem.appendChild(document.createTextNode(activator.name));
        switch (activator.type){
        case "bool":
            var label = document.createElement("label");
            label.className = "switch";
            var input = document.createElement("input");
            input.type = "checkbox";
            input.name = deviceId;
            input.onclick = onToggleInteracted;
            input.id = activator.activatorId;
            input.checked = activator.state;
            label.appendChild(input);
            var span = document.createElement("span");
            span.className = "switchSlider round";
            label.append(span);
            elem.appendChild(label);
            //var hiddenInput = document.createElement("input");
            //hiddenInput.type="hidden";
            //hiddenInput.value=deviceId;
            break;

        case "float":
            var slideContainer = document.createElement("div");
            slideContainer.className = "slidecontainer";
            var input = document.createElement("input");
            input.type = "range";
            input.min = 0;
            input.max = 100;
            input.step = 10;
            input.value = activator.state; // TODO Based on object
            input.className = "slider";
            input.id = activator.activatorId;
            input.oninput = onSliderInteracted;
            slideContainer.appendChild(input);
            elem.appendChild(slideContainer);
            break;
        default:
            console.log("Unknown activator type: " + activator.type);
        }
        activatorsElem.appendChild(elem);
    }
}

//Event handling functions for input elements for devices.
//  Each function requires a value, usually 'this.value', and an id,
//  usually 'this.id', where the id is unique for the given object and
//  can be used to identify the device to which it is linked.

//When the user toggles an on/off switch.
function onToggleInteracted(){
    console.log(this.name +" " + this.id + " " +this.checked);
    toggle(document.getElementById("serverAddress").value, this.name, this.id, this.checked);
}

//When the user changes a slider's value.
function onSliderInteracted(){
    // toggle(document.getElementById("serverAddress").value, this.value, this.id, this.checked);
    console.log("User changed slider: " + this.id + ", Current state: " + this.value);
}

// Data needed for testing device listing
var array = ([
    {
        "activators": [
            {
                "activatorId": "5ab37fcde82b3f07245b9d37",
                "rank": 0,
                "type": "bool",
                "name": "On/Off",
                "state": false
            },
            {
                "activatorId": "5ab37fcde82b3f07245b9d38",
                "rank": 1,
                "type": "float",
                "name": "Dimmer",
                "state": 0.5
            }
        ],
        "type": "Light",
        "name": "test2",
        "deviceId": "5ab37fcde82b3f07245b9d39"
    },
    {
        "activators": [
            {
                "activatorId": "5ab50835e82b3f10a33397a8",
                "rank": 0,
                "type": "bool",
                "name": "On/Off",
                "state": true
            },
            {
                "activatorId": "5ab50835e82b3f10a33397a9",
                "rank": 1,
                "type": "float",
                "name": "Dimmer",
                "state": 50
            }
        ],
        "type": "Light",
        "name": "test3",
        "deviceId": "5ab50835e82b3f10a33397aa"
    }
]);

function updateDeviceList () {
    var devices = getServerDevices(document.getElementById("serverAddress").value);
    devices.then(result => {
        populateDevices(result);
    })
        .catch(err =>{
            console.log(err);
        });
}
