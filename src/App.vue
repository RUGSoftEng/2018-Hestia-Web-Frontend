<template>
  <div id="app">
          <sui-button
            @click="$store.dispatch('addServer', {
              serverID: '25',
              userID: 'string',
              serverName: 'new',
              serverAddress: 'https://94.212.164.28',
              serverPort: '8000' });"
          >
            Add server
          </sui-button>
          <sui-button
            @click="$store.dispatch('deleteServer', {
              serverID: '2yTe6u2xRUubgNwXGF8YlQ',
               });"
          >
            Delete server
          </sui-button>

          <sui-button
            class="btn btn-primary btn-margin"
            v-if="!authenticated"
            @click="login()">
              Log In
          </sui-button>

          <sui-button
            class="btn btn-primary btn-margin"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </sui-button>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 200px;
  height: 50px;
}
</style>
