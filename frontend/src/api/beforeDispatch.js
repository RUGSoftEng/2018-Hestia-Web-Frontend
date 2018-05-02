/**
  Declares the translation layer between the web API and the local API
*/
export function preparePayloadPostServer(serverID, userID, serverName, serverAddress, serverPort) {
  return {
    server_id: serverID,
    user_id: userID,
    server_name: serverName,
    server_address: serverAddress,
    server_port: serverPort,
  };
}

export function hallo() {
  return 'hallo';
}
