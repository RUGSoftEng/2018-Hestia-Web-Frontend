<template>
  <div class="activator">
    <div v-if="type === 'bool'">
      <div class="ui slider checkbox">
        <input type="checkbox" name="activator_toggle">
        <label>{{name}}</label>
      </div>
    </div>
    <div v-else-if="type === 'float'">
      B
    </div>
    <div v-else>
      Not A/B/C
    </div>
  </div>
</template>

<script>
export default {
  name: 'Activator',
  data () {
    return {
      name: 'ActivatorName',
      type: 'bool',
      state: false
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
