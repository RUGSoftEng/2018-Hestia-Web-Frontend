<template lang="html">
  <div class="server">
    <!-- The sui-breadcrumb -->
    <sui-container class="ui raised segment breadcrumbs">
      <sui-breadcrumb>
        <h2>
          <sui-breadcrumb-section link>
            <router-link to="/">
              Servers
            </router-link>
          </sui-breadcrumb-section>
          <sui-breadcrumb-divider />
          <sui-breadcrumb-section active>
            {{this.$route.params.id}}
          </sui-breadcrumb-section>
        </h2>
      </sui-breadcrumb>
    </sui-container>
    <h2> {{server.IPAddress}} </h2>
    <DeviceGroup :server="this.server">
    </DeviceGroup>
  </div>
</template>
<script>
import 'vue-range-slider/dist/vue-range-slider.css';
import DeviceGroup from './DeviceGroup';

export default {
  props: [
    'auth', 'authenticated',
  ],
  components: {
    DeviceGroup,
  },
  beforeMount() {
    this.$store.dispatch('getServerDevices', { serverID: this.$route.params.id });
  },
  computed: {
    server() {
      return this.$store.state.currentServer;
    },
  },
};
</script>
  <style>
  .breadcrumbs {
    width: 70%;
    margin-bottom:25px !important;
    text-align: left;
  }
</style>
