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
            {{this.server.server_name}}
          </sui-breadcrumb-section>
        </h2>
      </sui-breadcrumb>
    </sui-container>

    <sui-container class="presetsContainer">
      <div class="presetDropdown">
       <sui-dropdown
          fluid
          selection
          :options="server.presets"
          text="Apply Preset"
          search
          required
        >
          <sui-dropdown-menu v-model="currentPreset">
            <sui-dropdown-item
            v-for="preset in server.presets"
            :value="preset.preset_id"
            :key="preset.preset_id"
            @click="presetChange(preset.preset_id)"
            >
              {{ preset.preset_name}}
            </sui-dropdown-item>
          </sui-dropdown-menu>
        </sui-dropdown>
      </div>
      <div class="presetButton">
        <sui-button
        class="createNewPreset"
        @click="displayPresetConfigurationModal()"
        >
          <sui-icon name="cog"/>
          Preset configurations
        </sui-button>
      </div>
    </sui-container>

    <!-- Preset configuration modal -->
    <sui-modal v-model="presetConfigurationModalVisible" dimmer="inverted">
      <sui-button
        id="closeButton"
        @click="undisplayPresetConfigurationModal()"
      >
        <sui-icon name="times"/>
      </sui-button>
      <sui-modal-header>
        Preset Configuration
      </sui-modal-header>
      <sui-divider horizontal>
        Create a new preset
      </sui-divider>
        <sui-input placeholder="Preset name" v-model="newPresetName"/>
        <sui-button
          @click="createNewPreset()"
        >
          Create new preset
        </sui-button>
      <sui-divider horizontal>
        Delete a preset
      </sui-divider>
      <sui-dropdown
         fluid
         selection
         :options="server.presets"
         text="Delete Preset"
         search
         required
       >
         <sui-dropdown-menu v-model="currentPreset">
           <sui-dropdown-item
           v-for="preset in server.presets"
           :value="preset.preset_id"
           :key="preset.preset_id"
           @click="deletePreset(preset.preset_id)"
           >
             {{ preset.preset_name}}
           </sui-dropdown-item>
         </sui-dropdown-menu>
       </sui-dropdown>
    </sui-modal>

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
      currentPreset: null,
      newPresetName: '',
      presetConfigurationModalVisible: false,
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
      this.$store.dispatch('postServerBatchRequest', { serverID: this.$route.params.id, presetID })
        .then(() => this.serverDeviceSynchronize());
    },
    createNewPreset() {
      this.$store.dispatch('postServerPreset', {
        serverID: this.$route.params.id,
        presetName: this.newPresetName,
      });
      this.newPresetName = '';
    },
    displayPresetConfigurationModal() {
      this.presetConfigurationModalVisible = !this.presetConfigurationModalVisible;
    },
    undisplayPresetConfigurationModal() {
      this.presetConfigurationModalVisible = !this.presetConfigurationModalVisible;
    },
    deletePreset(presetID) {
      this.$store.dispatch('deleteServerPreset', { serverID: this.$route.params.id, presetID });
    },
  },
};
</script>
  <style>
  .breadcrumbs {
    margin-bottom:10px !important;
    text-align: left;
  }
  .presetsContainer {
    display: block !important;
    height: 40px !important;
    margin-bottom: 15px !important;
  }
  .presetDropdown {
    width: 70% !important;
    float: left;
  }
  .presetButton {
    width: 30% !important;
    float: right;
  }
  .createNewPreset {
    float: right !important;
    margin: 0 !important;
  }
  #closeButton {
    float: right !important;
    margin: 0 !important;
  }
</style>
