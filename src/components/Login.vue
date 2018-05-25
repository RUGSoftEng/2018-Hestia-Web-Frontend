<template>
  <div>
    <h1>Login</h1>
    It turned out you were not authorized yet.<br>
    We are sorry for the disturbance, but could you pleace login.<br>
    <sui-button
    @click="auth.login()"
    >
    login
    </sui-button>
  </div>
</template>

<script>
export default {
  props: ['auth'],

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
