<template lang="html">
  <div class="server">
    <!-- The pop up modal when the user wants to add a device -->
    <sui-modal v-model="modalVisible" dimmer="inverted">
      <sui-modal-header>Adding a new device to {{ this.$route.params.id }}</sui-modal-header>
      <sui-modal-content>
        <div v-for="atribute in Object.keys(currentPluginAtributes)" :key="atribute">
          {{ atribute }}
          <br>
          {{ atribute }}
          <br>
          <sui-input
          v-model="currentPluginAtributes[atribute]"
          >
          </sui-input>
          <br>
        </div>
        <sui-button
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

    <!-- The button menu -->
    <div class="button-group">
        <sui-button @click="this.displayModal">Add Device</sui-button>
        <sui-dropdown
          selection
        >
          <sui-dropdown-menu v-model="this.currentPreset">
            <sui-dropdown-item
            v-for="preset in this.presets"
            :value="preset.value"
            :key="preset.value"
            @click="presetChange(preset.value)"
            >
              {{ preset.text}}
            </sui-dropdown-item>
          </sui-dropdown-menu>
        </sui-dropdown>
        <sui-button
        @click="login()"
        >Logout</sui-button>

    </div>

    <!-- The sui-breadcrumb -->
    <sui-breadcrumb>
      <sui-breadcrumb-section link>
        <router-link to="/">
          Servers
        </router-link>
      </sui-breadcrumb-section>
      <sui-breadcrumb-divider />
      <sui-breadcrumb-section active>
          {{server.name}}
      </sui-breadcrumb-section>
    </sui-breadcrumb>


    <h2> {{server.IPAddress}} </h2>
    <h3>I'm a Server Component</h3>

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
  data() {
    return {
      currentPreset: null,
      currentCollection: -1,
      currentCollectionDevice: -1,
      modalVisible: false,
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
  beforeMount() {
    // eslint-disable-next-line
    console.log(this.$route.params.id);
    this.$store.dispatch('getServerDevices', { serverID: this.$route.params.id });
  },
  computed: {
    server() {
      return this.$store.state.currentServer;
    },
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
    displayModal() {
      this.$store.dispatch('getServerPlugins', { serverID: this.$route.params.id });
      this.modalVisible = !this.modalVisible;
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
  },
};
</script>

<style>
.button-group{
  float: right;
  margin-right: 2em;
}

</style>
