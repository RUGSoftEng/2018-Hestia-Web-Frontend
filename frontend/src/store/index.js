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
  onActivatorChange(context, { deviceID, activatorID, newValue }) {
    const newServers = context.state.servers;
    newServers.forEach((server, index1) => {
      server.devices.forEach((device, index2) => {
        if (device.deviceID === deviceID) {
          device.activators.forEach((activator, index3) => {
            if (activator.activatorID === activatorID) {
              newServers[index1].devices[index2].activators[index3].state = newValue;
              // eslint-disable-next-line
              console.log(newServers);
            }
          });
        }
      });
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
