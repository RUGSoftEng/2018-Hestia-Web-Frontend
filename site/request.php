<?php

	//Sends a generic request to a URL.
	function sendRequest($method, $url, $data){
		try {
			$curl = curl_init();

			if (FALSE === $curl){
				throw new Exception("Failed to initialize curl.");
			}

			switch ($method){
				case "POST":
					curl_setopt($curl, CURLOPT_POST, true);
					if ($data){
						echo("Payload: ".$data);

						$data = str_replace('{"state":"0"}', '{"state":0.0}', $data);
						curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
					}
					break;

				case "PUT":
					curl_setopt($curl, CURLOPT_PUT, true);
					break;

				default:
					if ($data){
						$url = sprintf("%s?%s", $url, http_build_query($data));
					}
			}

			curl_setopt($curl, CURLOPT_URL, $url);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
			curl_setopt($curl, CURLOPT_HTTPHEADER, array(
					"Content-Type: application/json"
				));

			$result = curl_exec($curl);

			if (FALSE === $result){
				throw new Exception(curl_error($curl), curl_errno($curl));
			}

			curl_close($curl);
			return $result;
		} catch (Exception $e){
			echo(sprintf("Curl failed with error #%d: %s", 
				$e->getCode(), 
				$e->getMessage()));
			var_dump($_POST);
			return FALSE;
		}
	}

	//Converts string true or false to boolean.
	function toBool($str){
		return ($str === "true");
	}

	//Determines if a string represents a boolean.
	function isBool($str){
		return ($str === "true" or $str === "false");
	}

	//If the required fields are filled, proceed to relay the request to the hestia server.
	$encodedPayload = NULL;
	if (!empty($_POST["payload"])){
		$payload = $_POST["payload"];
		if (!empty($payload["state"])){
			//Convert any strings to either boolean or float.
			if (isBool($payload["state"])){
				$payload["state"] = toBool($payload["state"]);
			} else {
				$payload["state"] = (float)$payload["state"];

			}
		}
		var_dump($payload);
		$encodedPayload = json_encode($payload);
		//Replace whole numbers with decimals because API doesn't support whole numbers for some reason.
		if (!empty($payload["state"])){
			$encodedPayload = str_replace('{"state":1}', '{"state":1.0}', $encodedPayload);
			//$encodedPayload = str_replace('{"state":0}', '{"state":0.0}', $encodedPayload);
		}
	}
	$json = sendRequest($_POST["method"], $_POST["query"], $encodedPayload);
	echo($json);
	
?>