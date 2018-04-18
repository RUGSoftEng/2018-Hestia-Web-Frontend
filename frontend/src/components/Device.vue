<template>
  <div class="device">
    <sui-accordion-title>
      <sui-icon name="dropdown" />
      {{name + ":" + IPAddress}}
    </sui-accordion-title>
    <sui-accordion-content>
     <activator></activator>
    </sui-accordion-content>
  </div>
</template>

<script>
import Activator from './Activator.vue'

export default {
  name: 'Device',
  components: {
    'activator': Activator
  },
  data () {
    return {
      name: 'MyName',
      IPAddress: '0.0.0.0'
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
