<template>
  <div id="app">
          <div class="logo_header">
            <img class="ui bottom aligned small image" src="../src/assets/hestia.png">
          </div>
          <!--<sui-button
            @click="$store.dispatch('addServer', {
              serverID: '25',
              userID: 'string',
              serverName: 'new',
              serverAddress: 'https://94.212.164.28',
              serverPort: '8000' });"
          >
            Add server
          </sui-button><!--
          <sui-button
            @click="$store.dispatch('deleteServer', {
              serverID: '2yTe6u2xRUubgNwXGF8YlQ',
               });"
          >
            Delete server
          </sui-button>
          -->
          <sui-button
            class="btn btn-primary btn-margin"
            v-if="!authenticated"
            @click="login()">
              Log In
          </sui-button>
          <!--
          <sui-button
            class="btn btn-primary btn-margin"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </sui-button>-->
    <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated">
      </router-view>
    </div>
  </div>
</template>

<script>
import AuthService from './auth/AuthService';

const auth = new AuthService();

const { login, logout, authenticated, authNotifier } = auth;

export default {
  name: 'app',
  data() {
    authNotifier.on('authChange', (authState) => {
      this.authenticated = authState.authenticated;
    });
    return {
      auth,
      authenticated,
    };
  },
  methods: {
    login,
    logout,
  },
};
</script>

<style>
body {
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.logo_header {
  margin-top:-7.5em !important;
  margin-bottom: 25px !important;
  padding-top:9em;
  width:50%;
  height:14em;
  margin:0 auto;
  background-color:#FFFFFF;
  border-radius:0% 0% 500% 500%;
}

</style>
