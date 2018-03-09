<?php

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

	function prettyPrint( $json )
{
    $result = '';
    $level = 0;
    $in_quotes = false;
    $in_escape = false;
    $ends_line_level = NULL;
    $json_length = strlen( $json );

    for( $i = 0; $i < $json_length; $i++ ) {
        $char = $json[$i];
        $new_line_level = NULL;
        $post = "";
        if( $ends_line_level !== NULL ) {
            $new_line_level = $ends_line_level;
            $ends_line_level = NULL;
        }
        if ( $in_escape ) {
            $in_escape = false;
        } else if( $char === '"' ) {
            $in_quotes = !$in_quotes;
        } else if( ! $in_quotes ) {
            switch( $char ) {
                case '}': case ']':
                    $level--;
                    $ends_line_level = NULL;
                    $new_line_level = $level;
                    break;

                case '{': case '[':
                    $level++;
                case ',':
                    $ends_line_level = $level;
                    break;

                case ':':
                    $post = " ";
                    break;

                case " ": case "\t": case "\n": case "\r":
                    $char = "";
                    $ends_line_level = $new_line_level;
                    $new_line_level = NULL;
                    break;
            }
        } else if ( $char === '\\' ) {
            $in_escape = true;
        }
        if( $new_line_level !== NULL ) {
            $result .= "\n".str_repeat( "\t", $new_line_level );
        }
        $result .= $char.$post;
    }

    return $result;
}

	if (!empty($_POST["query"])){
		$json = sendRequest($_POST["method"], "https://0.0.0.0:8000/".$_POST["query"]);
		$jsonOutput = json_decode($json, JSON_PRETTY_PRINT);
		var_dump($jsonOutput);
	} else {
		echo("Send something next time.");
	}
?>