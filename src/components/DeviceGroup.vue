<template>
<div class="DeviceGroup">

  <!-- Modal for changing a device name -->
  <sui-modal v-model="deviceSettingsModalVisible" dimmer="inverted">
    <sui-modal-header>{{ deviceSettingsDevice.name }} - Device Settings</sui-modal-header>
    <sui-modal-content>
      New device name<br>
      <input v-model="deviceSettingsDevice.name"/>
      <br>
      <br>
      <sui-button @click="confirmPutDeviceName">
        Change Settings
      </sui-button>
    </sui-modal-content>
  </sui-modal>


  <!-- Modal for adding a new device -->
  <sui-modal v-model="modalVisible" dimmer="inverted">
    <sui-modal-header>Adding a new device to {{ this.$route.params.id }}</sui-modal-header>
    <sui-modal-content>
      <sui-dropdown
         selection
         :options="plugins"
         placeholder="Select a collection"
         search
         required
         v-model="currentCollection"
         @click="pluginCollectionClicked()"
       />

       <sui-dropdown
          selection
          :options="pluginsCollections"
          text="Select a device"
          search
          required
          v-model="currentCollectionDevice"
          v-if="currentCollection != null"
          @click="pluginCollectionDeviceClicked()"
        />

        <sui-button primary
        v-if="currentCollectionDevice != null"
        @click="postDevice()"
        >
          Add the new device
        </sui-button>

        <div v-if="currentPluginAtributes != null">
          <div v-for="atribute in Object.keys(currentPluginAtributes)" :key="atribute">
            {{ atribute }}
            <br>
            <br>
            <sui-input
            v-model="currentPluginAtributes[atribute]"
            >
            </sui-input>
            <br>
          </div>
        </div>
        <br>
      {{ currentPluginAtributes }}
      </sui-modal-content>
    </sui-modal>


  <div class="ui container">
    <sui-card-group :items-per-row="3" stackable>
      <sui-card class="add_card" v-on:click="this.displayModal">
        <sui-card-content>
          <sui-card-content>
            <br>
            <sui-icon name="add" size="massive" class="center add_icon" />
          </sui-card-content>
          <sui-card-content extra>
            Add Device
          </sui-card-content>
        </sui-card-content>
      </sui-card>
      <Device
      v-for="device in server"
      :device="device"
      :key="device.deviceId"
      v-on:deviceSettingsModalActivated="displayDeviceSettingsModal"
      v-on:deviceChange="deviceChange"
      >
      </Device>
    </sui-card-group>
  </div>
</div>
</template>
<script>
import Device from './Device';

export default {
  props: {
    server: {
      required: true,
    },
  },
  components: {
    Device,
  },
  data() {
    return {
      currentCollection: null,
      currentCollectionDevice: null,
      deviceSettingsModalVisible: false,
      deviceSettingsDevice: {},
      modalVisible: false,
      dimmerActive: false,
    };
  },
  computed: {
    pluginsCollections() {
      return this.$store.state.currentServerPluginsCollections;
    },
    plugins() {
      return this.$store.state.currentServerPlugins;
    },
    currentPluginAtributes() {
      return this.$store.state.currentPluginAtributes.required_info;
    },
  },
  methods: {
    deviceChange() {
      this.$emit('deviceGroupChange');
    },
    displayModal() {
      this.$store.dispatch('getServerPlugins', { serverID: this.$route.params.id });
      this.modalVisible = !this.modalVisible;
    },
    displayDeviceSettingsModal(payload) {
      this.deviceSettingsDevice = payload.device;
      this.deviceSettingsModalVisible = !this.deviceSettingsModalVisible;
    },
    confirmPutDeviceName() {
      this.$store.dispatch('putServerDevice', {
        serverID: this.$route.params.id,
        deviceID: this.deviceSettingsDevice.deviceId,
        deviceName: this.deviceSettingsDevice.name,
      });
      this.deviceSettingsModalVisible = !this.deviceSettingsModalVisible;
    },
    pluginCollectionClicked() {
      /* eslint-disable */
        if (this.currentCollection != null) {
          this.$store.dispatch('getServerPluginsCollections',
          {
            serverID: this.$route.params.id,
            collection: this.$store.state.currentServerPlugins[this.currentCollection].text,
          });
        }
      },
      pluginCollectionDeviceClicked() {
        if (this.currentCollection != null && this.currentCollectionDevice != null) {
          this.$store.dispatch('getServerPluginCollectionDevice', {
            serverID: this.$route.params.id,
            collection: this.$store.state.currentServerPlugins[this.currentCollection].text,
            device: this.$store.state.currentServerPluginsCollections[this.currentCollectionDevice].text,
          });
        }
        /* eslint-enable */
    },
    postDevice() {
      const payloadtest = this.$store.state.currentPluginAtributes;
      this.$store.dispatch('postServerDevice',
        {
          serverID: this.$route.params.id,
          deviceInfo: payloadtest,
        });
      this.deviceChange();
      this.modalVisible = !this.modalVisible;
    },
  },
};
</script>
<style scoped>
.add_card {
  background:none !important;
  border:5px dashed #FFFFFF !important;
  box-shadow:none !important;
  color:#FFFFFF;
  font-weight:bold;
}
</style>
