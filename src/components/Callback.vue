<template>
  <sui-loader active/>
</template>
<script>
export default {
  name: 'callback',
  props: ['auth'],
  data() {
    this.auth.handleAuthentication();
    return {};
  },
};
</script>
<style></style>
