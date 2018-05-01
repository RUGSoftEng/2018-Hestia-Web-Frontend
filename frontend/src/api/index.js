import axios from 'axios';

const servers = [{
  name: 'Localhost',
  id: '1',
  IPAddress: '0.0.0.0',
  port: '5000',
  currentPreset: null,
  presets: [{
    text: 'my favourite',
    value: 1,
  }, {
    text: 'goomba stomp special',
    value: 2,
  }, {
    text: 'dwarf fortress surprise',
    value: 3,
  },
  ],
  devices: [{
    deviceID: '5ad64e8d16617b100e4d0bce',
    name: 'test',
    type: 'Lock',
    activators: [{
      activatorID: '5ad64e8d16617b100e4d0bcd',
      rank: 0,
      name: 'Activate',
      type: 'bool',
      state: false,
    }],
  },
  {
    deviceID: '5ad658a716617b1916bfafc9',
    name: '123',
    type: 'Light',
    activators: [{
      activatorID: '5ad658a716617b1916bfafc7',
      rank: 0,
      name: 'On/Off',
      type: 'bool',
      state: true,
    }, {
      activatorID: '5ad658a716617b1916bfafc8',
      rank: 1,
      name: 'Dimmer',
      type: 'float',
      state: 0.8,
    }, {
      activatorID: '5ad658a716617b1916bfafb2',
      rank: 1,
      name: 'MatrixText',
      type: 'label',
      state: 'Hello World!',
    }],
  }],
}, {
  name: 'Localhost2',
  id: '2',
  IPAddress: '0.0.0.0',
  port: '5000',
  currentPreset: null,
  presets: [{
    text: 'my favourite',
    value: 1,
  }, {
    text: 'goomba stomp special',
    value: 2,
  }, {
    text: 'dwarf fortress surprise',
    value: 3,
  },
  ],
  devices: [{
    deviceID: '5ad64e8d16617b100e4d0bce',
    name: 'test',
    type: 'Lock',
    activators: [{
      activatorID: '5ad64e8d16617b100e4d0bcd',
      rank: 0,
      name: 'Activate',
      type: 'bool',
      state: false,
    }],
  },
  {
    deviceID: '5ad658a716617b1916bfafc9',
    name: '123',
    type: 'Light',
    activators: [{
      activatorID: '5ad658a716617b1916bfafc7',
      rank: 0,
      name: 'On/Off',
      type: 'bool',
      state: true,
    }, {
      activatorID: '5ad658a716617b1916bfafc8',
      rank: 1,
      name: 'Dimmer',
      type: 'float',
      state: 0.8,
    }, {
      activatorID: '5ad658a716617b1916bfafb2',
      rank: 1,
      name: 'MatrixText',
      type: 'label',
      state: 'Hello World!',
    }],
  }],
}];

export function fetchServers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resolve) {
        resolve(servers);
      } else {
        reject(Error('Servers problem'));
      }
    }, 300);
  });
}

export function fetchServer(serverid) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentServer = servers.find(server => server.id === serverid);
      if (currentServer) {
        resolve(currentServer);
      } else {
        reject(Error('Server does not exist'));
      }
    }, 300);
  });
}

export function getServers() {
  const url = 'http://localhost:5000/servers';
  // eslint-disable-next-line
  console.log('getServers in API bitches')
  return axios.get(url);
}

export function getServer(serverid, payload) {
  const url = `http://localhost:5000/servers/${serverid}/request`;
  // eslint-disable-next-line
  console.log(payload);
  return axios({
    method: 'POST',
    url: `${url}`,
    data: `${payload}`,
  });
}
