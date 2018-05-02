import axios from 'axios';


export function getServers() {
  const url = 'http://localhost:5000/servers';
  // eslint-disable-next-line
  console.log('getServers in API bitches')
  return axios.get(url);
}

export function getServer(serverid, payload) {
  const url = `http://localhost:5000/servers/${serverid}/request`;
  // eslint-disable-next-line
  console.log(JSON.stringify(payload));
  return axios({
    method: 'POST',
    url: `${url}`,
    data: payload,
  });
}
