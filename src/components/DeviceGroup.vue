<template>
  <div class="ui container">
    <sui-card-group :items-per-row="3" stackable>
      <Device
        v-for="device in server"
        :device="device"
        :key="device.deviceId"
      >

      </Device>
    </sui-card-group>
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
};

</script>

<style scoped>

</style>