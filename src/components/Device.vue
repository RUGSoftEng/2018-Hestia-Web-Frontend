<template>
    <sui-card :key="device.deviceId">
      <sui-dimmer :active="dimmerActive" inverted>
        <sui-loader>Changing device state</sui-loader>
      </sui-dimmer>
      <sui-card-content>
        <sui-card-header fluid>
          {{ device.name }}
          <sui-dropdown icon="angle down">
            <sui-dropdown-menu>
              <sui-dropdown-item @click="displayDeviceSettingsModal(device)">
                <sui-icon name="cog"/>
                Settings
                </sui-dropdown-item>
                <sui-dropdown-item
                @click="deleteButton(device.deviceId)"
                >
                  <sui-icon name="trash" />Delete device
              </sui-dropdown-item>
            </sui-dropdown-menu>
          </sui-dropdown>
        </sui-card-header>
        <sui-card-meta>
          <strong>{{ device.type }}</strong> - {{ device.deviceId }}
        </sui-card-meta>
        <sui-divider horizontal>
          <h5 is="sui-header">
            <i class="plug icon"></i>
            Activators
          </h5>
        </sui-divider>
        <div class="ui form">
          <div class="grouped fields">
            <Activator
            v-for="activator in device.activators"
            :activator="activator"
            :key="activator.activatorId"
            v-on:activatorChange="updateActivatorLocal"
            v-on:activatorClick="updateActivatorGlobal"
            >
            </Activator>
          </div>
        </div>
      </sui-card-content>
    </sui-card>
</template>
<script>
import Activator from './Activator';

export default{
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  components: {
    Activator,
  },
  data() {
    return {
      dimmerActive: false,
    };
  },
  methods: {
    displayDeviceSettingsModal(device) {
      this.$emit('deviceSettingsModalActivated', { device });
    },
    updateActivatorLocal(payload) {
      this.$store.commit('setActivatorState',
        {
          deviceId: this.device.deviceId,
          currentActivator: payload.currentActivator,
          activatorState: payload.activatorState,
        });
    },
    updateActivatorGlobal(payload) {
      this.dimmerActive = true;
      this.$store.dispatch('activatorUpdate',
        { activator: payload.activator,
          deviceID: this.device.deviceId,
          serverID: this.$route.params.id,
        })
        .then(() => {
          this.dimmerActive = false;
        }, (error) => {
          // eslint-disable-next-line
                console.log(error);
        },
        );
    },
    deleteButton(deviceID) {
      this.$store.dispatch('deleteServerDevice', { serverID: this.$route.params.id, deviceId: deviceID });
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
      this.modalVisible = !this.modalVisible;
    },
  },
};
</script>
