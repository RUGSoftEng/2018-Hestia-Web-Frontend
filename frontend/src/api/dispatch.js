import axios from 'axios';

const WEB_API_CONFIG = {
  url: 'http://localhost:5000',
};

function createAuthorizationHeader() {
  const token = localStorage.getItem('access_token');
  const header = 'Bearer '.concat(token);
  // eslint-disable-next-line
  console.log(header);
  return header;
}

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

export function httpGetServers() {
  const url = `${WEB_API_CONFIG.url}/servers/`;
  // eslint-disable-next-line
  console.log('getServers in API bitches')
  return axios.get(url, { headers: { Authorization: createAuthorizationHeader() } });
}

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
export function httpPostServerRequest(serverid, method, payload) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}/request`;
  return axios({
    method,
    url,
    data: payload,
  });
}
