<template>
  <div class="server">
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

    <sui-card-group :items-per-row="3">
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
                @click="changeState(device.deviceID)" />
              </div>
              <div v-else-if="activator.type === 'float'">
                <range-slider
                class="slider"
                min="0"
                max="1"
                step="0.05"
                v-model="activator.state">
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

export default {
  methods: {
    changeState(deviceID) {
      // eslint-disable-next-line
      console.log(deviceID);
    },
  },
  components: {
    RangeSlider,
  },
  beforeMount() {
    this.$store.dispatch('loadServer', { id: this.$route.params.id });
  },
  computed: {
    server() {
      return this.$store.state.currentServer;
    },
  },
};
</script>

<style>

</style>
