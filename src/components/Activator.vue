<template>
  <div class="field">
    <div v-if="activator.type === 'bool'">
      <sui-checkbox :label = activator.name toggle
      v-model="activatorState"
      @click="activatorClicked"
      />
    </div>
    <div v-else-if="activator.type === 'float'">
      <range-slider
      class="slider"
      min="0"
      max="1"
      step="0.05"
      v-model="activatorState"
      @change="activatorClicked"
      >
    </range-slider>
    {{ activator.name }}
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
<sui-divider></sui-divider>
</div>
</template>
<script>
import RangeSlider from 'vue-range-slider';

export default{
  props: {
    activator: {
      type: Object,
      required: true,
    },
  },
  components: {
    RangeSlider,
  },
  computed: {
    activatorState: {
      get() {
        return this.activator.state;
      },
      set(newState) {
        this.$emit('activatorChange', { currentActivator: this.activator, activatorState: newState });
      },
    },
  },
  methods: {
    activatorClicked() {
      // eslint-disable-next-line
            console.log(this);
      this.$emit('activatorClick', { activator: this.activator });
    },
  },
};
</script>
    <style>
    .range-slider-fill {
      background-color:#4064cb !important;
    }
  </style>
