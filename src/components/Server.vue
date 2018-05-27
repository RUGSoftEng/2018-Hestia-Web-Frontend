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

    <div class="presetsContainer">
      <select
      v-model="currentPreset"
      required
      >
        <option value="-1" disabled selected hidden>Select a preset</option>
        <option
        v-for="preset in server.presets"
        :key="preset.preset_id"
        :value="preset.preset_id"
        @click="presetChange(preset.preset_id)"
        >
          {{ preset.preset_name }}
        </option>
        </select>
        <input v-model="newPresetName"/>

        <sui-button
        @click="createNewPreset()"
        >
          New preset
        </sui-button>
    </div>

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
      newPresetName: '',
    };
  },
  props: [
    'auth', 'authenticated',
  ],
  components: {
    DeviceGroup,
  },
  beforeMount() {
    this.$store.dispatch('initializeServerInformation', { serverID: this.$route.params.id });
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
    presetChange(presetID) {
      // eslint-disable-next-line
      console.log(presetID);
      this.$store.dispatch('postServerBatchRequest', { serverID: this.$route.params.id, presetID });
    },
    createNewPreset() {
      this.$store.dispatch('postServerPreset', {
        serverID: this.$route.params.id,
        presetName: this.newPresetName,
      });
      this.newPresetName = '';
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
