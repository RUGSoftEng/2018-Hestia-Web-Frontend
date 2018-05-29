<template>
  <div id="app">
    <router-link to="/">
      <div class="logo_header">
        <img class="ui bottom aligned small image" src="../src/assets/hestia.png">
      </div>
    </router-link>
    <div class="auth_header">
      <!--<sui-button
      class="btn btn-primary btn-margin"
      v-if="!authenticated"
      @click="login()">
        Log In
      </sui-button>-->
      <sui-button
      class="btn btn-primary btn-margin"
      v-if="authenticated"
      @click="logout()">
        Log Out
      </sui-button>
    </div>

    <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated"
      >
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
  padding-top:8.75em;
  width:50%;
  height:14em;
  margin:0 auto;
  background-color:#FFFFFF;
  border-radius:0% 0% 500% 500%;
}

.logo_header:hover {
  padding-top:9em !important;
  transition:all .2s;
  -webkit-transition:all .2s;
  -moz-osx-transition:all .2s;
}

.auth_header {
  position:fixed;
  top:0 !important;
  right:0 !important;
  margin:0 !important;
  padding:0 !important;
}

</style>
