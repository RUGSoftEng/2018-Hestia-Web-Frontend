// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';

// imports of AJAX functions
import {
  httpGetServers,
  httpPostServerRequest,
  httpPostServers,
  httpDeleteServer,
  httpGetServer,
} from '@/api/dispatch';
import { preparePayloadPostServer } from '@/api/beforeDispatch';


Vue.use(Vuex);

const state = {
  // single source of data
  serversList: [],
  currentServer: {},
};

const actions = {
  // asynchronous operations

  loadServersList(context) {
    // eslint-disable-next-line
    console.log('loadServersList');
    return httpGetServers()
      .then((response) => {
        context.commit('setServersList', { serversList: response.data });
      })
      .catch((error) => {
        // eslint-disable-next-line
        alert(error)
      });
  },
  addServer(context, { serverID, userID, serverName, serverAddress, serverPort }) {
    const payload = preparePayloadPostServer(
      serverID,
      userID,
      serverName,
      serverAddress,
      serverPort);
    return httpPostServers(payload)
      .then(setTimeout(
        context.dispatch('loadServersList'), 1000,
      ),
      )
      .catch((error) => {
        // eslint-disable-next-line
          alert(error)
      });
  },
  deleteServer(context, { serverID }) {
    return httpDeleteServer(serverID)
      .then(setTimeout(
        context.dispatch('loadServersList'), 1000,
      ),
      )
      .catch((error) => {
        // eslint-disable-next-line
          alert(error)
      });
  },
  getServer(context, { serverID }) {
    // eslint-disable-next-line
    return httpGetServer(serverID)
      .then(setTimeout(
        context.dispatch('loadServersList'), 1000,
      ),
      )
      .catch((error) => {
        // eslint-disable-next-line
          alert(error)
      });
  },
  loadServer(context, { serverid }) {
    // eslint-disable-next-line
    console.log('loadServer');
    return httpPostServerRequest(serverid)
      .then(response => context.commit('setServer', { server: response }))
      .catch((error) => {
        // eslint-disable-next-line
        alert(error);
      });
  },
  activatorUpdate(context, { activator, deviceID }) {
    return new Promise((resolve, reject) => {
      // mock ajax request
      setTimeout(() => {
        // try making the AJAX request
        // is there anything to check there??
        // maybe check by retrieving the devices and check the activator state?
        if (resolve) {
          context.commit('setActivator', { curActivator: activator, curDeviceID: deviceID });
          resolve('Successful');
        } else {
          reject('Could not establish a server connection. Please try again.');
        }
      }, 3000);
    });
  },
};

const mutations = {
  // isolated data mutations
  // eslint-disable-next-line
  setServersList(state, payload) {
    // eslint-disable-next-line
    console.log("setServers");
    // eslint-disable-next-line
    console.log(payload.serversList);
    state.serversList = payload.serversList;
  },
  // for each server declare memory for each atribute.
  // eslint-disable-next-line
  setServer(state, payload) {
    // eslint-disable-next-line
    console.log(JSON.stringify(payload.server.data));
    state.currentServer = payload.server;
  },
  // eslint-disable-next-line
  setActivator(state, payload){
    state.currentServer.devices.forEach((device, index1) => {
      if (device.deviceID === payload.curdeviceID) {
        device.activators.forEach((activator, index2) => {
          if (activator.activatorID === payload.curActivator.activatorID) {
            // eslint-disable-next-line
            state.currentServer.devices[index1].activators[index2].state = payload.curActivator.state;
          }
        });
      }
    });
  },
};

const getters = {
  // reusable data accessors
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});

export default store;
