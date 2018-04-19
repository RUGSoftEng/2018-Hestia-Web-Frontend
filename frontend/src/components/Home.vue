<template>
  <div class="home">
    <sui-breadcrumb>
      <sui-breadcrumb-section active>
        Servers
      </sui-breadcrumb-section>
    </sui-breadcrumb>
    <h2 class="title">Check out your servers</h2>
    <section class="section">
      <div class="container">
        <sui-card-group :items-per-row="3" stackable>
          <sui-card v-for="server in servers" :key="server.name">
            <sui-card-content>
              <sui-card-header> {{server.name}}
                 <!-- settings dropdwon menu -->
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
              <sui-card-meta> {{server.IPAddress + ':' + server.port}} </sui-card-meta>
              <sui-divider/>
              <!--enter server button -->
              <router-link :to="`Server/${server.id}`">
                <sui-button animated>
                  <sui-button-content visible>Enter server</sui-button-content>
                  <sui-button-content hidden>
                    <sui-icon name="right arrow" />
                  </sui-button-content>
                </sui-button>
              </router-link>
              <sui-divider/>
              <!-- preset dropdwon  -->
              <sui-dropdown
              text="Select Preset"
              button
              search
              selection
              multiple
              :max-selections="1"
              :options="server.presets"
              v-model="server.currentPreset"
              />
            </sui-card-content>
          </sui-card>
        </sui-card-group>
      </div>
    </section>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
import { mapState } from 'vuex';

export default {
  computed: mapState({
    servers: state => state.servers,
  }),
  components: {
    RangeSlider,
  },
  beforeMount() {
    this.$store.dispatch('loadServers');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
