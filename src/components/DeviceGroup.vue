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
      <sui-button primary
      v-if="currentCollectionDevice != -1"
      @click="postDevice()"
      >
        Add the new device
      </sui-button>
      <select
      v-model="currentCollection"
      required
      >
        <option value="-1" disabled selected hidden>Select a collection</option>
          <option
            v-for="plugin in plugins"
            :key="plugin.key"
            :value="plugin.key"
            @click="pluginCollectionClicked()"
          >
            {{ plugin.collectionName }}
          </option>
        </select>
        <select
        v-model="currentCollectionDevice"
        v-if="currentCollection != -1"
        required
        >
          <option value="-1" disabled selected hidden>Select a device</option>
          <option
          v-for="collection in pluginsCollections"
          :key="collection.key"
          :value="collection.value"
          @click="pluginCollectionDeviceClicked()"
          >
            {{ collection.deviceName }}
          </option>
        </select>
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
      currentCollection: -1,
      currentCollectionDevice: -1,
      deviceSettingsModalVisible: false,
      deviceSettingsDevice: {},
      modalVisible: false,
      dimmerActive: false,
      presetPlaceholder: 'select a preset',
      presets: [{
        text: 'my favourite',
        value: 1,
        key: 1,
      }, {
        text: 'goomba stomp special',
        value: 2,
        key: 2,
      }, {
        text: 'dwarf fortress surprise',
        value: 3,
        key: 3,
      },
      ],
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
    presetChange(value) {
      // eslint-disable-next-line
        console.log(value);
    },
    pluginCollectionClicked() {
      /* eslint-disable */
        this.$store.dispatch('getServerPluginsCollections',
        {
          serverID: this.$route.params.id,
          collection: this.$store.state.currentServerPlugins[this.currentCollection].collectionName,
        });
      },
      pluginCollectionDeviceClicked() {
        console.log('pluginCollectionDeviceClicked');
        this.$store.dispatch('getServerPluginCollectionDevice', {
          serverID: this.$route.params.id,
          collection: this.$store.state.currentServerPlugins[this.currentCollection].collectionName,
          device: this.$store.state.currentServerPluginsCollections[this.currentCollectionDevice].deviceName,
        });
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
