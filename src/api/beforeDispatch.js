/**
  @file Declares the translation layer between the web API and the local API.
  All payloads necessary to make GET, POST, PUT and DELETE requestType are
  generated here. Each function returns a payload for the request specified
  in the function name. The payload needs the paramaters in the function.
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

export function preparePayloadPutServer(serverName, serverAddress, serverPort) {
  return {
    server_name: serverName,
    server_address: serverAddress,
    server_port: serverPort,
  };
}

export function hallo() {
  return 'hallo';
}

export function preparePayloadGetServerDevice() {
  return {
    requestType: 'GET',
    endpoint: '/devices/',
    optionalPayload: {},
  };
}

export function perparePayloadDeleteServerDevice(deviceId) {
  return {
    requestType: 'DELETE',
    endpoint: `/devices/${deviceId}`,
    optionalPayload: {},
  };
}

export function preparePayloadPutServerDevice(deviceId, deviceName) {
  return {
    requestType: 'PUT',
    endpoint: `/devices/${deviceId}`,
    optionalPayload: {
      name: deviceName,
    },
  };
}

export function preparePayloadPostServerDevice(deviceInfo) {
  return {
    requestType: 'POST',
    endpoint: '/devices/',
    optionalPayload: deviceInfo,
  };
}

export function preparePayloadGetServerPlugins() {
  return {
    requestType: 'GET',
    endpoint: '/plugins/',
    optionalPayload: {},
  };
}

export function preparePayloadGetServerPluginsCollections(collection) {
  return {
    requestType: 'GET',
    endpoint: `/plugins/${collection}`,
    optionalPayload: {},
  };
}

export function preparePayloadGetServerPluginsCollectionDevice(collection, device) {
  return {
    requestType: 'GET',
    endpoint: `/plugins/${collection}/plugins/${device}`,
    optionalPayload: {},
  };
}

export function preparePayloadPostServerDevicesActivator(activator, deviceID) {
  return {
    requestType: 'POST',
    endpoint: `/devices/${deviceID}/activators/${activator.activatorId}`,
    optionalPayload: {
      state: activator.state,
    },
  };
}
