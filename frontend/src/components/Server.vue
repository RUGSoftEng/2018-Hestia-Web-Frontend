<template>
  <div class="server">
    <sui-card>
      <sui-card-content>
        <sui-card-header>{{name}}</sui-card-header>
        <sui-card-meta>{{IPAddress + ":" + port}}</sui-card-meta>
      </sui-card-content>
      <sui-card-content extra>
        <sui-accordion exclusive styled>
          <device></device>
          <device></device>
          <device></device>
        </sui-accordion>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
import Device from './Device.vue'

export default {
  name: 'Server',
  components: {
    'device': Device
  },
  data () {
    return {
      name: 'ServerName',
      IPAddress: '0.0.0.0',
      port: '5000'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
