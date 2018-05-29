<template>
  <div class="home">

    <!-- Modal for adding a new server -->
    <sui-modal v-model="addModalVisible" dimmer="inverted">
      <sui-modal-header>Adding a Server</sui-modal-header>
      <sui-modal-content>
        Server Name<br>
        <input v-model="addServerName"/>
        <br>
        <br>
        Server IP<br>
        <input v-model="addServerIp"/>
        <br>
        <br>
        Server Port<br>
        <input v-model="addServerPort"/>
        <br>
        <br>
        <sui-button @click="this.confirmAddServer">
          Add Server
        </sui-button>
      </sui-modal-content>
    </sui-modal>

    <!-- Modal for editing server information -->
    <sui-modal v-model="editModalVisible" dimmer="inverted">
      <sui-modal-header>Edit Server</sui-modal-header>
      <sui-modal-content>
        Server Name
        <br>
        <input v-model="editServerName"/>
        <br>
        <br>
        Server IP
        <br>
        <input v-model="editServerIp"/>
        <br>
        <br>
        Server Port<br>
        <input v-model="editServerPort"/>
        <br>
        <br>
        <sui-button @click="this.confirmEditServer"> Edit Server </sui-button>
      </sui-modal-content>
    </sui-modal>


    <sui-container class="ui raised segment breadcrumbs">
      <sui-breadcrumb>
        <h2>
          <sui-breadcrumb-section active> Servers </sui-breadcrumb-section>
        </h2>
      </sui-breadcrumb>
    </sui-container>
    <section class="ui section">
      <div class="ui container">
        <sui-card-group :items-per-row="3" stackable raised>
          <sui-card class="add_card" v-on:click="this.displayAddModal">
            <sui-card-content>
              <sui-card-content>
                <br>
                <sui-icon name="add" size="massive" class="center add_icon" /> </sui-card-content>
                <sui-card-content extra> Add Server </sui-card-content>
              </sui-card-content>
            </sui-card>
            <sui-card v-for="server in servers" :key="server.server_id">
              <sui-card-content v-if="!server.online">
                <sui-icon name="red power off"/>
                This server appears to be offline
              </sui-card-content>
              <sui-card-content>
                <sui-card-header> {{server.server_name}}
                  <!-- settings dropdwon menu -->
                  <sui-dropdown icon="angle down">
                    <sui-dropdown-menu>
                      <sui-dropdown-item @click="displayEditModal(server.server_id)">
                        <sui-icon name="cog" />
                        Settings
                      </sui-dropdown-item>
                      <sui-dropdown-item @click="deleteButton(server.server_id)">
                        <sui-icon name="trash" /> Delete server
                      </sui-dropdown-item>
                    </sui-dropdown-menu>
                  </sui-dropdown>
                </sui-card-header>
                <sui-card-meta> {{server.server_address + ':' + server.server_port}}
                </sui-card-meta>
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
      addModalVisible: false,
      addServerName: '',
      addServerIp: '',
      addServerPort: '',
      editModalVisible: false,
      editServerID: '',
      editServerName: '',
      editServerIp: '',
      editServerPort: '',
    };
  },
  beforeMount() {
    this.$store.dispatch('loadServersList');
  },
  methods: {
    validServerAddress(Ip, port) {
      const serverRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/g;
      const resultIp = Ip.match(serverRegex);
      const resultPort = Number(port);
      // eslint-disable-next-line
      console.log('validServerAddress');
      if (resultIp !== null && resultPort >= 0 && resultPort <= 65535) {
        return true;
      }
      return false;
    },
    deleteButton(serverID) {
      this.$store.dispatch('deleteServer', { serverID });
    },
    displayAddModal() {
      this.addModalVisible = !this.addModalVisible;
    },
    displayEditModal(serverId) {
      this.editModalVisible = !this.editModalVisible;
      this.editServerID = serverId;
    },
    confirmAddServer() {
      if (this.validServerAddress(this.addServerIp, this.addServerPort)) {
        this.$store.dispatch('addServer', {
          serverName: this.addServerName,
          serverAddress: `https://${this.addServerIp}`,
          serverPort: this.addServerPort });
        this.addModalVisible = !this.addModalVisible;
      }
    },
    confirmEditServer() {
      if (this.validServerAddress(this.editServerIp, this.editServerPort)) {
        this.$store.dispatch('putServer', {
          serverID: this.editServerID,
          serverName: this.editServerName,
          serverAddress: `https://${this.editServerIp}`,
          serverPort: this.editServerPort });
        this.editModalVisible = !this.editModalVisible;
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.breadcrumbs {
width: 70%;
height:4em;
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
