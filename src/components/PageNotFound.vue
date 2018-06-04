<template>
  <div>
    <h1>Page not found</h1>
    <p>
      Sorry we could not find the page <i> {{ pageName }} </i>.<br>
      <sui-button
      @click="routerGo"
      >
      Home.
    </sui-button>
  </p>
</div>
</template>
<script>
export default{
  computed: {
    pageName() {
      // removing the first slash from the URL path
      return (this.$route.path).substring(1, (this.$route.path).length);
    },
  },
  methods: {
    routerGo() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
