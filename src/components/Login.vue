<template>
  <sui-card class="ui centered">
    <sui-card-header>
      <h1>Login</h1>
    </sui-card-header>
    <sui-card-content>
      <sui-button
      @click="auth.login()" class="primary"
      >
      login
      </sui-button>
    </sui-card-content>
    <sui-card-meta>
      Please log in first.<br>
    </sui-card-meta>
  </sui-card>
</template>

<script>
export default {
  props: ['auth'],

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
