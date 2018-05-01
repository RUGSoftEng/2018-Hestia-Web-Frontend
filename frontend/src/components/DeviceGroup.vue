<template>
  <sui-card-group :item-per-row="3" stackable>
    <Device
      v-for="device in server.devices"
      :device="device"
      :key="device.deviceID"
    >

    </Device>
  </sui-card-group>

</template>

<script>
import Device from './Device';

export default {
  props: {
    server: {
      type: Object,
      required: true,
    },
  },
  components: {
    Device,
  },
};

</script>
