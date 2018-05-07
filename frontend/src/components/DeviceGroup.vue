<template>
  <sui-card-group :item-per-row="3" stackable>
    <Device
      v-for="device in server"
      :device="device"
      :key="device.deviceId"
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
