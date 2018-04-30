<template>
  <div id="app">
    <sui-button
    @click="login()"
    >
      Login
    </sui-button>
    <router-view/>
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
