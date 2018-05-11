<template>
  <sui-card :key="device.deviceId">
    <sui-dimmer :active="dimmerActive" inverted>
      <sui-loader>Changing device state</sui-loader>
    </sui-dimmer>
    <sui-card-content>
      <sui-card-meta>
        {{ device.deviceId }}
      </sui-card-meta>
      <sui-card-header fluid>
        {{ device.name }}
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
      <sui-card-meta>
       {{ device.type }}
      </sui-card-meta>

      <sui-divider horizontal>
        <h5 is="sui-header">
          <i class="plug icon"></i>
          Activators
        </h5>
      </sui-divider>

      <div class="ui-from">
        <div class="grouped fields">
          <Activator
          v-for="activator in device.activators"
          :activator="activator"
          :key="activator.activatorId"
          v-on:activatorChange="updateActivator"
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
  // beforeMount() {
  //   this.dimmerActive = 0;
  // },
  methods: {
    updateActivator(currentActivator) {
      this.dimmerActive = true;
      this.$store.dispatch('activatorUpdate',
        { activator: currentActivator,
          deviceID: this.device.deviceId,
          serverID: this.$route.params.id })
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
  },
};
</script>
