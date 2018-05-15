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
import {
  preparePayloadPostServer,
  preparePayloadGetServerDevices,
  preparePayloadGetServerPlugins,
  preparePayloadGetServerPluginsCollections,
  preparePayloadGetServerPluginsCollectionDevice,
  preparePayloadPostServerDevicesActivator,
} from '@/api/beforeDispatch';


Vue.use(Vuex);

const state = {
  // single source of data
  serversList: [],
  currentServer: {},
  currentServerPlugins: [],
  currentServerPluginsCollections: [],
  currentPluginAtributes: {},
};
const actions = {
  // asynchronous operations

  /**
   * Dispatches a function that loads all the servers linked to your account.
   * On succesfull response the servers inforamtion is loaded into the store.
   * @param  {[type]} context [description]
   * @return {JSON}         [description]
   */
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
  /**
   * Dispatches the httpPostServers and refreshes the servers list
   * after succesfully adding the server to your account.
   * @param {[type]} context       [description]
   * @param {[type]} serverID      [description]
   * @param {[type]} userID        [description]
   * @param {[type]} serverName    [description]
   * @param {[type]} serverAddress [description]
   * @param {[type]} serverPort    [description]
   */
  addServer(context, { serverID, userID, serverName, serverAddress, serverPort }) {
    const payload = preparePayloadPostServer(
      serverID,
      userID,
      serverName,
      serverAddress,
      serverPort);
    return httpPostServers(payload)
      .then(setTimeout(() => {
        context.dispatch('loadServersList');
      }, 1000,
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
  getServerDevices(context, { serverID }) {
    const payload = preparePayloadGetServerDevices();
    return httpPostServerRequest(serverID, payload)
      .then(response => context.commit('setServer', { server: response }))
      .catch((error) => {
        // eslint-disable-next-line
        alert(error);
      });
  },
  getServerPlugins(context, { serverID }) {
    const payload = preparePayloadGetServerPlugins();
    return httpPostServerRequest(serverID, payload)
      .then(response => context.commit('setServerPlugins', { plugins: response }))
      .catch((error) => {
        // eslint-disable-next-line
        alert(error);
      });
  },
  getServerPluginsCollections(context, { serverID, collection }) {
    const payload = preparePayloadGetServerPluginsCollections(collection);
    return httpPostServerRequest(serverID, payload)
      .then(response => context.commit('setServerPluginsCollections', { collections: response, collection }))
      .catch((error) => {
        // eslint-disable-next-line
        alert(error);
      });
  },
  getServerPluginCollectionDevice(context, { serverID, collection, device }) {
    const payload = preparePayloadGetServerPluginsCollectionDevice(collection, device);
    return httpPostServerRequest(serverID, payload)
      .then(response => context.commit('setServerPluginCollectionDevice', {
        atributes: response,
      }))
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  },
  /**
   * This function is not working yet!
   * @param  {[type]} context   [description]
   * @param  {[type]} activator [description]
   * @param  {[type]} deviceID  [description]
   * @param  {[type]} serverID  [description]
   * @return {[type]}           [description]
   */
  activatorUpdate(context, { activator, deviceID, serverID }) {
    // eslint-disable-next-line
    console.log('activatorUpdate in store');
    const payload = preparePayloadPostServerDevicesActivator(activator, deviceID);
    // eslint-disable-next-line
    console.log(JSON.stringify(payload));
    // eslint-disable-next-line
    console.log(JSON.stringify(serverID));
    return httpPostServerRequest(serverID, payload)
      .then(() => {
        context.dispatch('getServerDevices', { serverid: serverID });
      })
      .catch((error) => {
        // eslint-disable-next-line
        alert(error);
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
  // eslint-disable-next-line
  setServer(state, payload) {
    state.currentServer = payload.server.data;
  },
  // eslint-disable-next-line
  setServerPlugins(state, payload) {
    const plugins = [];
    let i = 0;
    payload.plugins.data.forEach((element) => {
      plugins.push({
        collectionName: element,
        key: i,
        value: i,
      });
      i += 1;
    });
    state.currentServerPlugins = plugins;
  },
  // eslint-disable-next-line
  setServerPluginsCollections(state, payload) {
    const collections = [];
    let i = 0;
    payload.collections.data.forEach((element) => {
      collections.push({
        deviceName: element,
        key: i,
        value: i,
      });
      i += 1;
    });
    state.currentServerPluginsCollections = collections;
  },
  // eslint-disable-next-line
  setServerPluginCollectionDevice(state, payload) {
    // eslint-disable-next-line
    console.log("setServerPlguinCollectionDevice");
    // eslint-disable-next-line
    console.log(JSON.stringify(payload.atributes.data.required_info));
    state.currentPluginAtributes = payload.atributes.data;
  },
  // eslint-disable-next-line
  setActivator(state, payload) {
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
