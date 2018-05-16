<template>
  <div class="home">

    <sui-modal v-model="modalVisible" dimmer="inverted">
      <sui-modal-header>Adding a Server</sui-modal-header>
      <sui-modal-content>
        Server Name<br>
        <input v-model="addServerName">
        </input><br><br>

        Server IP<br>
        <input v-model="addServerIp">
        </input><br><br>

        Server Port<br>
        <input v-model="addServerPort">
        </input><br><br>

        <sui-button @click="this.confirmAddServer">
        Add Server
        </sui-button>
      </sui-modal-content>
    </sui-modal>



    <sui-breadcrumb class="ui raised segment breadcrumbs">
      <sui-breadcrumb-section active>
        <h2>Servers</h2>
      </sui-breadcrumb-section>
    </sui-breadcrumb>
    <section class="ui section">
      <div class="ui container">
        <sui-card-group :items-per-row="3" stackable raised>
            <sui-card class="add_card" v-on:click="this.displayModal">
              <sui-card-content>
                <sui-card-content>
                  <br><sui-icon name="add" size="massive" class="center add_icon" />
                </sui-card-content>
                <sui-card-content extra>
                  Add Server
                </sui-card-content>
              </sui-card-content>
            </sui-card>
          <sui-card v-for="server in servers" :key="server.server_id">
            <sui-card-content>
              <sui-card-header> {{server.server_name}}
                 <!-- settings dropdwon menu -->
                <sui-dropdown icon="angle down">
                  <sui-dropdown-menu>
                    <sui-dropdown-item>
                      <sui-icon name="cog"/>
                      Settings
                    </sui-dropdown-item>
                    <sui-dropdown-item
                      @click="deleteButton(server.server_id)"
                    >
                      <sui-icon name="trash" />Delete server
                    </sui-dropdown-item>
                    
                  </sui-dropdown-menu>
                </sui-dropdown>
              </sui-card-header>
              <sui-card-meta> {{server.server_address + ':' + server.server_port}} </sui-card-meta>
              <sui-divider/>
              <!--enter server button -->
              <router-link :to="`Server/${server.server_id}`">
                <sui-button primary animated>
                  <sui-button-content visible>Enter server</sui-button-content>
                  <sui-button-content hidden>
                    <sui-icon name="right arrow" />
                  </sui-button-content>
                </sui-button>
              </router-link>
              <sui-divider/>
              <!-- preset dropdwon  -->
              <!--<sui-dropdown
              text="Select Preset"
              button
              search
              selection
              multiple
              :max-selections="1"
              :options="server.presets"
              v-model="server.currentPreset"
              />-->
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
    servers: state => state.serversList,
  }),
  components: {
    RangeSlider,
  },
  data() {
    return {
      modalVisible: false,
      addServerName: '',
      addServerIp: '',
      addServerPort: '',
    };
  },
  beforeMount() {
    this.$store.dispatch('loadServersList');
  },
  methods: {
    deleteButton(serverID) {
      // eslint-disable-next-line
      console.log('delete!!')
      this.$store.dispatch('deleteServer', { serverID });
    },
    displayModal() {
      this.modalVisible = !this.modalVisible;
    },
    confirmAddServer() {
      this.$store.dispatch('addServer', {
              serverID: '25',
              userID: 'string',
              serverName: this.addServerName,
              serverAddress: 'https://' + this.addServerIp,
              serverPort: this.addServerPort });
      this.modalVisible = !this.modalVisible;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .breadcrumbs {
    width: 70%;
    margin-bottom:25px !important;
    text-align: left;
  }

  .add_card {
    background:none !important;
    border:5px dashed #FFFFFF !important;
    box-shadow:none !important;
    color:#FFFFFF;
    font-weight:bold;
    cursor:pointer;
  }
</style>