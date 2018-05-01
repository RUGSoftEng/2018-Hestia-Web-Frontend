// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';

// imports of AJAX functions
import { fetchServers, fetchServer } from '@/api';

Vue.use(Vuex);

const state = {
  // single source of data
  servers: [],
  currentServer: {},
};

const actions = {
  // asynchronous operations


  loadServers(context) {
    // eslint-disable-next-line
    console.log('loadServers');
    return fetchServers()
      .then(response => context.commit('setServers', { servers: response }));
  },
  loadServer(context, { id }) {
    // eslint-disable-next-line
    console.log('loadServer');
    return fetchServer(id)
      .then(response => context.commit('setServer', { server: response }));
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
  setServers(state, payload) {
    // eslint-disable-next-line
    console.log("setServers");
    state.servers = payload.servers;
  },
  // for each server declare memory for each atribute.
  // eslint-disable-next-line
  setServer(state, payload) {
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
