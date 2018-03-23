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


