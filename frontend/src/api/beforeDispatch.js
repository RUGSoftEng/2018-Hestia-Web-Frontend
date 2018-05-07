/**
  @file Declares the translation layer between the web API and the local API
*/
/**
 * [preparePayloadPostServer description]
 * @param  {string} serverID      [description]
 * @param  {string} userID        [description]
 * @param  {string} serverName    [description]
 * @param  {string} serverAddress [description]
 * @param  {string} serverPort    [description]
 * @return {object} Payload
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

export function preparePayloadGetServerDevices() {
  return {
    requestType: 'GET',
    endpoint: '/devices/',
    optionalPayload: {},
  };
}

export function preparePayloadPostServerDevicesActivator(activator, deviceID) {
  return {
    requestType: 'POST',
    enpoint: `/devices/${deviceID}/activators/${activator.activatorId}`,
    optionalPayload: {
      state: activator.state,
    },
  };
}
