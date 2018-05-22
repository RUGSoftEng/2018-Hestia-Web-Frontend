template>
<div class="DeviceGroup">
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
      currentPreset: null,
      currentCollection: -1,
      currentCollectionDevice: -1,
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
  beforeMount() {
    // eslint-disable-next-line
      console.log(this.$route.params.id);
    this.$store.dispatch('getServerDevices', { serverID: this.$route.params.id });
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
<style scoped>
.add_card {
  background:none !important;
  border:5px dashed #FFFFFF !important;
  box-shadow:none !important;
  color:#FFFFFF;
  font-weight:bold;
}
</style>
