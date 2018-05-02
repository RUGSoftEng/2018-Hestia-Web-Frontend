<template lang="html">
  <div class="server">
    <!-- The pop up modal when the user wants to add a device -->
    <sui-modal v-model="modalVisible" dimmer="inverted">
      <sui-modal-header>Adding a new device to {{ this.server.name }}</sui-modal-header>
      <sui-modal-content>
        <sui-input placeholder="Device Name"/>
        <sui-input placeholder="IP adress"/>
        <sui-input placeholder="Port Number"/>
      </sui-modal-content>

    </sui-modal>

    <!-- The button menu -->
    <div class="button-group">
        <sui-button @click="this.displayModal">Add Device</sui-button>
        <sui-dropdown
          placeholder="Select a preset"
          selection
          v-model="this.current"
        >
          <sui-dropdown-menu v-model="this.current">
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
import { mapState } from 'vuex';
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
      current: null,
      modalVisible: false,
      payload: {},
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
    this.payload = {
      requestType: 'GET',
      endpoint: '/devices/',
      optionalPayload: {},
    };
    this.$store.dispatch('loadServer', { serverid: this.$route.params.id });
  },
  computed: mapState({
    server: state => state.currentServer,
  }),
  methods: {
    displayModal() {
      this.modalVisible = !this.modalVisible;
    },
    presetChange(value) {
      // eslint-disable-next-line
      console.log(value);
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
