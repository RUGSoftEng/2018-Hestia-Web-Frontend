/**
  @file Declares the translation layer between the web API and the local API.
  All data received from the server that needs modifying is modified into the
  form we think apropraite to work with the data.
*/

/**
 * Inserts the presets obtained via a http request into our serverlist under the
 * property name presets.
 * @param  {[type]} serverList the list of servers that we store in the store.
 * @param  {[type]} presets the list of presets belong to a single server.
 * @return {[type]}         the updated list of servers now one of the servers
 * in the serverList contains the presets.
 */
export function insertServersPresets(serverList, presets) {
  const servers = serverList;
  for (let i = 0; i < servers.length; i += 1) {
    if (serverList[i].server_id === presets[0].server_id) {
      servers[i].presets = presets;
    }
  }
  return servers;
}

export function insertServerPresets(server, presets) {
  const outServer = server;
  outServer.presets = presets;
  return outServer;
}
