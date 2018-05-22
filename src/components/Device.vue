require 'htmlbeautifier'
beautiful = HtmlBeautifier.beautify(messy)
<template>
  <sui-card :key="device.deviceId">
    <sui-modal v-model="modalVisible" dimmer="inverted">
      <sui-modal-header>Edit device</sui-modal-header>
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
<sui-button primary
v-if="currentCollectionDevice != -1"
@click="postDevice()"
>
Confirm
</sui-button>
</sui-modal-content>
</sui-modal>
<sui-dimmer :active="dimmerActive" inverted>
  <sui-loader>Changing device state</sui-loader>
</sui-dimmer>
<sui-card-content>
  <sui-card-header fluid>
    {{ device.name }}
    <sui-dropdown icon="angle down">
      <sui-dropdown-menu>
        <sui-dropdown-item @click="displayModal()">
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
          <!--<sui-card-meta>
         {{ device.type }}
       </sui-card-meta>-->
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
        modalVisible: false,
      };
    },
    methods: {
      displayModal() {
        this.$store.dispatch('getServerPlugins', { serverID: this.$route.params.id });
        this.modalVisible = !this.modalVisible;
      },
      updateActivatorLocal(payload) {
            // eslint-disable-next-line
            console.log(JSON.stringify(payload));
            this.$store.commit('setActivatorState',
            {
              deviceId: this.device.deviceId,
              currentActivator: payload.currentActivator,
              activatorState: payload.activatorState,
            });
          },
          updateActivatorGlobal(payload) {
            // eslint-disable-next-line
            console.log(payload.activator);
            // eslint-disable-next-line
            console.log('hoi');
            this.dimmerActive = true;
            this.$store.dispatch('activatorUpdate',
              { activator: payload.activator,
                deviceID: this.device.deviceId,
                serverID: this.$route.params.id,
              })
            .then((response) => {
                // eslint-disable-next-line
                console.log(response);
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
            this.modalVisible = !this.modalVisible;
          },
        },
      };
    </script>
