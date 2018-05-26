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
      <select
      v-model="currentPreset"
      required
      >
        <option value="-1" disabled selected hidden>Select a preset</option>
        <option
        v-for="preset in server.presets"
        :key="preset.preset_id"
        :value="preset.preset_id"
        @click="presetChange()"
        >
          {{ preset.preset_name }}
        </option>
        </select>
    </sui-container>
    <!-- <h2> {{server.IPAddress}} </h2> -->
    <DeviceGroup
    :server="this.serverDevices"
    v-on:deviceGroupChange="serverDeviceSynchronize">
    </DeviceGroup>
  </div>
</template>
<script>
import 'vue-range-slider/dist/vue-range-slider.css';
import DeviceGroup from './DeviceGroup';

export default {
  data() {
    return {
      currentPreset: -1,
    };
  },
  props: [
    'auth', 'authenticated',
  ],
  components: {
    DeviceGroup,
  },
  beforeMount() {
    this.$store.dispatch('getServer', { serverID: this.$route.params.id });
    this.$store.dispatch('getServerPresets', { serverID: this.$route.params.id });
    this.serverDeviceSynchronize();
  },
  computed: {
    serverDevices() {
      return this.$store.state.currentServerDevices;
    },
    server() {
      return this.$store.state.currentServer;
    },
  },
  methods: {
    serverDeviceSynchronize() {
      // eslint-disable-next-line
      console.log('serverDeviceSynchronize');
      this.$store.dispatch('getServerDevices', { serverID: this.$route.params.id });
    },
    presetChange() {

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
