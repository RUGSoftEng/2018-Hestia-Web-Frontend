<!doctype html>
<html>
  <head>
  	<meta charset="utf-8">
  	<title>Hestia Test Page</title>
  </head>
  <body>
  	<h1>Hestia Command Interface</h1>
  	Query to send:<br>
  	<input id="queryInput"></input><br>
  	Request method: (GET, POST, PUT, etc)<br>
  	<input id="methodInput">GET</input><br>
  	<button type="submit" onclick="sendRequest()">Click me to test API!</button>
	<pre id="result"></pre>
  </body>
  <script>
	    function sendRequest(){
	    	var request = new XMLHttpRequest();
	    	var url = "serverConnection.php";
	    	request.onreadystatechange = function(){
	    		if (this.readyState == 4 && this.status == 200){
	    			result = this.responseText;
	    			obj = JSON.parse(result);
	    			document.getElementById("result").innerHTML = JSON.stringify(obj, undefined, 2);
	    		}
	    	};
	    	var data = "query="+document.getElementById("queryInput").value+
	    		"&method="+document.getElementById("methodInput").value;
	    	request.open("POST", url, true);
	    	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    	request.send(data);
	    }
    </script>
</html>