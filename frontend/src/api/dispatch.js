/**
 * @file Manages dispatching the http requests to the web api.
 */
import axios from 'axios';

/**
 * Config for the endpoint
 */
const WEB_API_CONFIG = {
  url: 'http://localhost:5000',
};

/**
 * createAuthorizationHeader - Provides the header for authorizing a user.
 *
 * @return {String}  Returns header to be added to the http requests.
 */
function createAuthorizationHeader() {
  const token = localStorage.getItem('access_token');
  const header = 'Bearer '.concat(token);
  // eslint-disable-next-line
  console.log(header);
  return header;
}

/**
 * httpPostUsers - Adds a user.
 *
 * @return {type}  Returns the promise,
 *                 either containing the response of the server or an error.
 */
export function httpPostUsers() {
  const url = `${WEB_API_CONFIG.url}/users/`;
  return axios({
    method: 'POST',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

/**
 * httpGetServers - Get all the servers.
 *
 * @return {type}  Returns the promise,
 *                 either containing the response of the server or an error.
 */
export function httpGetServers() {
  const url = `${WEB_API_CONFIG.url}/servers/`;
  // eslint-disable-next-line
  console.log('getServers in API bitches')
  return axios.get(url, { headers: { Authorization: createAuthorizationHeader() } });
}

/**
 * httpPostServers -  Add a server.
 *
 * @param  {type} payload Payload that describes a server to be added.
 * @return {type}         Returns the promise,
 *                        either containing the response of the server or an error.
 */
export function httpPostServers(payload) {
  // eslint-disable-next-line
  console.log('httpPostServers')
  const url = `${WEB_API_CONFIG.url}/servers/`;
  return axios({
    method: 'POST',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
    data: payload,
  });
}

/**
 * httpDeleteServer -  Delete a server.
 *
 * @param  {String} serverid ID of the server.
 * @return {type}          Returns the promise,
 *                         either containing the response of the server or an error.
 */
export function httpDeleteServer(serverid) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}`;
  return axios({
    method: 'DELETE',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

/**
 * httpGetServer -  Get the information of the server.
 *
 * @param  {String} serverid ID of the server.
 * @return {Promise}       Returns the promise,
 *                         either containing the response of the server or an error.
 */
export function httpGetServer(serverid) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}`;
  return axios({
    method: 'GET',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

/**
 * httpPostServerRequest -  Send a request to be forwarded to the server.
 *
 * @param  {String} serverid ID of the server.
 * @param  {type} payload  the payload to be forwarded.
 * @return {Promise}       Returns the promise,
 *                         either containing the response of the server or an error.
 */
export function httpPostServerRequest(serverid, payload) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}/request`;
  return axios({
    method: 'POST',
    url,
    data: payload,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}
