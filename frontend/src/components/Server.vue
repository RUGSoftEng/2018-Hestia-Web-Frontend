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

    <sui-card-group :items-per-row="3" stackable>
      <sui-card v-for="device in server.devices" :key="device.deviceID">
        <sui-card-content>
          <sui-card-meta> {{device.deviceID}} </sui-card-meta>
          <sui-card-header fluid>
            {{device.name}}
            <sui-dropdown icon="wrench">
              <sui-dropdown-menu>
                <sui-dropdown-item>
                  <sui-icon name="chart bar" />Statistics
                </sui-dropdown-item>
                <sui-dropdown-item>
                  <sui-icon name="cog"/>
                  Settings
                </sui-dropdown-item>
              </sui-dropdown-menu>
            </sui-dropdown>
          </sui-card-header>
          <sui-card-meta> {{device.type}} </sui-card-meta>

          <sui-divider horizontal>
            <h5 is="sui-header">
              <i class="plug icon"></i>
              Activators
            </h5>
          </sui-divider>
          <div class="ui-form">
            <div class="grouped fields">
              <div class="fields" v-for="activator in device.activators"
              :key="activator.activatorID">
              <div v-if="activator.type === 'bool'">
                <sui-checkbox :label = activator.name toggle
                v-model="activator.state"
                @click="changeState(device.deviceID, activator.activatorID)" />
              </div>
              <div v-else-if="activator.type === 'float'">
                <range-slider
                class="slider"
                min="0"
                max="1"
                step="0.05"
                v-model="activator.state" @change=
                "changeState(device.deviceID, activator.activatorID)">
              </range-slider>
              {{activator.name}}
            </div>
            <div v-else>
              <sui-message
              icon="exclamation triangle icon"
              :header=activator.name
              content="Activator unknown">
              <br/>
              <sui-button icon="paper plane" content="Contact us" />
            </sui-message>
          </div>
        </div>
      </div>
    </div>
  </sui-card-content>
</sui-card>
</sui-card-group>
</div>
</template>

<script>
import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
import { mapState } from 'vuex';

export default {
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
  methods: {
    changeState(deviceID, activatorID) {
      // The state is already saved in the model.
      // Only need deviceID and activatorID to get the state out of the model.
      // Now the state can be send to the server.
      // No need to worry about the type of activator.

      // eslint-disable-next-line
      console.log(deviceID, activatorID, this.server.devices[1].activators[0].state, this.$store.state.servers[1].devices[1].activators[0].state);
    },
    presetChange(value) {
      // eslint-disable-next-line
      console.log(value);
      // this.presets.forEach((preset) => {
      //   if (preset.value === value) {
      //     this.current = preset.text;
      //   }
      // });
    },
  },
  components: {
    RangeSlider,
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
