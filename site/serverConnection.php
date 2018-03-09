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
			return FALSE;
		}
	}

	if (!empty($_POST["query"])){
		$json = sendRequest($_POST["method"], "https://0.0.0.0:8000/".$_POST["query"]);
		echo($json);
	} else {
		echo("Send something next time.");
	}
?>