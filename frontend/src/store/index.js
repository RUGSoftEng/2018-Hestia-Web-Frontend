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
    return fetchServers()
      .then(response => context.commit('setServers', { servers: response }));
  },
  loadServer(context, { id }) {
    return fetchServer(id)
      .then(response => context.commit('setServer', { server: response }));
  },
};

const mutations = {
  // isolated data mutations
  // eslint-disable-next-line
  setServers(state, payload) {
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
