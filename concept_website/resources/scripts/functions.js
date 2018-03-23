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