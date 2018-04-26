<template lang="html">
  <div class="server">
    <div class="button-group">

        <sui-button>Add Device</sui-button>
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
        <sui-button>Logout</sui-button>

    </div>

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
  components: {
    DeviceGroup,
  },
  data() {
    return {
      current: null,
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
    this.$store.dispatch('loadServer', { id: this.$route.params.id });
    this.$store.dispatch('loadServers');
  },
  computed: mapState({
    server: state => state.currentServer,
  }),
};
</script>

<style>
.button-group{
  float: right;
  margin-right: 2em;
}

</style>
