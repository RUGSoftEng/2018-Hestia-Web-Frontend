import axios from 'axios';

const WEB_API_CONFIG = {
  url: 'http://localhost:5000',
};

export function httpGetServers() {
  const url = `${WEB_API_CONFIG.url}/servers/`;
  // eslint-disable-next-line
  console.log('getServers in API bitches')
  return axios.get(url);
}

export function httpPostServers(payload) {
  const url = `${WEB_API_CONFIG.url}/servers/`;
  return axios({
    method: 'POST',
    url,
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
