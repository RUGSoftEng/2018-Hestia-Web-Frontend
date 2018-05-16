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
            <sui-dropdown-item>
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
    };
  },
  methods: {
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
  },
};
</script>
