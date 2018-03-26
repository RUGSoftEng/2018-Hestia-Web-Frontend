function getDevicesFromServer(){
      var request = new XMLHttpRequest();
      var url = "/request";

      request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
          result = this.responseText;
          obj = JSON.parse(result);
          document.getElementById("resultArea").innerHTML = obj[2].name;

        }
      };

      var data = {
        "query" : "https://94.212.164.28:8000/devices",
        "method" : "GET"
      };

      request.open("POST", url, true);
      request.setRequestHeader("Content-type", "application/json");
      request.send(JSON.stringify(data));
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
    }

function createDeviceList(deviceList){
    document.getElementById("resultArea").innerHTML = "HOI";
    var item, i = 0;
    for(item in deviceList){
        item = deviceList[i];
        var p = document.createElement('li');
        var lu = document.getElementsByClassName("device_list");
        p.appendChild(document.createTextNode(item.name));
        p.setAttribute("class", "device_row");
        p.setAttribute("onclick", `getActivator(${i})`);
        lu[0].appendChild(p);
        i++;
    }
}

//Server interaction functions:
//  These functions are used to abstract getting data from the server
//  and generating a dynamic object representation.

//Sends a request to a server, to the specific endpoint. 
function sendRequest(serverAddress, endpoint, method, payload={}, callback){
    var request = new XMLHttpRequest();
    var url = "/request";

    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            result = this.responseText;
            obj = JSON.parse(result);
            callback(obj);
        }
    };

    var data = {
        query : serverAddress + endpoint,
        method : method,
        payload : payload
    };

    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
}

//Removes all children from an element.
function removeChildren(node){
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}

//Populates the list of devices from some data received from the server.
//  data is a list of devices as received from the server.
function populateDevices(data){
    var namesListElem = document.getElementById("deviceNamesList");
    removeChildren(namesListElem);
    var activatorsListElem = document.getElementById("activatorsList");
    //removeChildren(activatorsListElem);
    data.forEach(function(device){
        console.log(device.name);
        var elem = document.createElement("li");
        elem.className="device_row";
        elem.appendChild(document.createTextNode(device.name));
        namesListElem.appendChild(elem);
    });
    namesListElem.firstChild.className="device_row active";
    
}

//Event handling functions for input elements for devices.
//  Each function requires a value, usually 'this.value', and an id,
//  usually 'this.id', where the id is unique for the given object and
//  can be used to identify the device to which it is linked.

//When the user toggles an on/off switch.
function onToggleInteracted(value, id){
    console.log("User toggled device: " + id + ", Current state: " + value);
    populateDevices(array);
}

//When the user changes a slider's value.
function onSliderInteracted(value, id){
    console.log("User changed slider: " + id + ", Current state: " + value);
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
                "state": true
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
                "state": 0.5
            }
        ],
        "type": "Light",
        "name": "test3",
        "deviceId": "5ab50835e82b3f10a33397aa"
    }
]);

function testThis(){
    createDeviceList(array);
}


