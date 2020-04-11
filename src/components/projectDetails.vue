<template>
  <div>
    <br />
    <table
      v-if="this.images != null && this.$store.state.selectedTab == 'images'"
      class="table table-striped"
    >
      <tr>
        <th>IMAGES:</th>
      </tr>
    </table>
    <table
      v-if="this.images != null && this.$store.state.selectedTab == 'images'"
      class="table table-striped"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Model</th>
          <th>Name</th>
          <th>Size</th>
          <th>Min Ram</th>
          <th>Min Disk</th>
          <th>Status</th>
          <th>Visibility</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="image in images" :key="image.id">
          <td>{{ image.id }}</td>
          <td>{{ image.hw_rng_model }}</td>
          <td>{{ image.name }}</td>
          <td>{{ image.size }}</td>
          <td>{{ image.min_ram }}</td>
          <td>{{ image.min_disk }}</td>
          <td>{{ image.status }}</td>
          <td>{{ image.visibility }}</td>
          <td>{{ image.created_at }}</td>
          <td>{{ image.updated_at }}</td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="this.networks != null && this.$store.state.selectedTab =='networks'"
      class="table table-striped"
    >
      <tr>
        <th>NETWORKS:</th>
      </tr>
    </table>
    <table
      v-if="this.networks != null && this.$store.state.selectedTab =='networks'"
      class="table table-striped"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>MTU</th>
          <th>Status</th>
          <th>Subnets</th>
          <th>Shared</th>
          <th>Description</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="network in networks" :key="network.id">
          <td>{{ network.id }}</td>
          <td>{{ network.name }}</td>
          <td>{{ network.mtu }}</td>
          <td>{{ network.status }}</td>
          <td>{{ network.subnets }}</td>
          <td>{{ network.shared }}</td>
          <td>{{ network.description }}</td>
          <td>{{ network.created_at }}</td>
          <td>{{ network.updated_at }}</td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="this.floatingIPs != null && this.$store.state.selectedTab =='floatingiptab'"
      class="table table-striped"
    >
      <tr>
        <th>Floating IPs:</th>
      </tr>
    </table>
    <table
      v-if="this.floatingIPs != null && this.$store.state.selectedTab =='floatingiptab'"
      class="table table-striped"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Description</th>
          <th>Floating IP address</th>
          <th>Port ID</th>
          <th>Floating network ID</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="floatIP in floatingIPs" :key="floatIP.id">
          <td>{{ floatIP.id || "N/A" }}</td>
          <td>{{ floatIP.status || "N/A" }}</td>
          <td>{{ floatIP.description || "N/A" }}</td>
          <td>{{ floatIP.floating_ip_address || "N/A" }}</td>
          <td>{{ floatIP.port_id || "N/A" }}</td>
          <td>{{ floatIP.floating_network_id || "N/A" }}</td>
          <td>{{ floatIP.created_at || "N/A" }}</td>
          <td>{{ floatIP.updated_at || "N/A" }}</td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="this.flavors != null && this.$store.state.selectedTab == 'flavors'"
      class="table table-striped"
    >
      <tr>
        <th>FLAVORS:</th>
      </tr>
    </table>
    <table
      v-if="this.flavors != null && this.$store.state.selectedTab == 'flavors'"
      class="table table-striped"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Ram</th>
          <th>Disk</th>
          <th>Virtual CPUs</th>
          <th>Public Access</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flavor in flavors" :key="flavor.id">
          <td>{{ flavor.id }}</td>
          <td>{{ flavor.name }}</td>
          <td>{{ flavor.ram }}</td>
          <td>{{ flavor.disk }}</td>
          <td>{{ flavor.vcpus }}</td>
          <td>{{ flavor["os-flavor-access:is_public"] }}</td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="this.instances != null && this.$store.state.selectedTab == 'instances'"
      class="table table-striped"
    >
      <tr>
        <th>Instances:</th>
      </tr>
    </table>
    <table
      v-if="this.instances != null && this.$store.state.selectedTab == 'instances'"
      class="table table-striped"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instance in instances" :key="instance.id">
          <td>{{ instance.id }}</td>
          <td>{{ instance.name }}</td>
          <td>
            <b-button
              variant="outline-secondary"
              v-on:click.prevent="editInstance(instance)"
            >Edit Instance</b-button>|
            <b-button
              variant="outline-danger"
              v-on:click.prevent="deleteInstance(instance)"
            >Delete Instance</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="this.volumes != null && this.$store.state.selectedTab == 'volumes'"
      class="table table-striped"
    >
      <tr>
        <th>Volumes:</th>
      </tr>
    </table>
    <table
      v-if="this.volumes != null && this.$store.state.selectedTab == 'volumes'"
      class="table table-striped"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="volume in volumes" :key="volume.id">
          <td>{{ volume.id }}</td>
          <td>{{ volume.name }}</td>
        </tr>
      </tbody>
    </table>

    <createInstance
      v-if="this.$store.state.selectedTab =='createInstance'"
      :networks="this.networks"
      :images="this.images"
      :flavors="this.flavors"
      @reload-instances="reloadInstances"
    />

    <editInstance
      v-if="this.$store.state.selectedTab =='editInstance'"
      :currentInstance="this.selectedInstance"
      :networks="this.networks"
      :images="this.images"
      :flavors="this.flavors"
      @reload-instances="reloadInstances"
    />

    <createVolume
      v-if="this.$store.state.selectedTab =='createVolume'"
      @reload-volumes="reloadVolumes"
    />

    <createFloatingIP
      v-if="this.$store.state.selectedTab =='createFloatingIP'"
      @reload-floatingIP="reloadFloatingIP"
    />

    <uploadImage v-if="this.$store.state.selectedTab =='uploadImage'" />
    <dashboard v-if="this.$store.state.selectedTab =='dashboard'" />
  </div>
</template>
<script>
import CreateInstanceComponent from "./createInstance";
import EditInstanceComponent from "./editInstance";
import CreateVolumeComponent from "./createVolume";
import UploadImageComponent from "./uploadImage";
import DashboardComponent from "./dashboard";
import CreateFloatingIPComponent from "./createFloatingIP";


export default {
  props: [],
  data: function() {
    return {
      images: null,
      networks: null,
      flavors: null,
      instances: null,
      volumes: null,
      floatingIPs: null,
      selectedInstance: null,
      loaded: 0
    };
  },
  methods: {
    loadImages: function() {
      var axiosImages = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });

      axiosImages
        .get("/image/v2/images")
        .then(response => {
          this.images = response.data.images;
          this.loaded++;

          if (this.loaded >= 5) {
            this.$toasted.show("Loading Complete").goAway(2000);
            this.$store.commit("loadingComplete", true);
          }
        })
        .catch(error => {
          console.log("Failed to load Images");
          console.log(error);
        });
    },
    loadNetworks: function() {
      var axiosNetworks = this.axios.create({
        baseURL: "http://devstack.local:9696",
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });

      axiosNetworks
        .get("/v2.0/networks")
        .then(response => {
          this.networks = response.data.networks;
          console.log(this.networks);
          this.loaded++;

          if (this.loaded >= 5) {
            this.$toasted.show("Loading Complete").goAway(2000);
            this.$store.commit("loadingComplete", true);
          }
        })
        .catch(error => {
          console.log("Failed to load Networks");
          console.log(error);
        });
    },
    loadFloatingIP: function() {
      var axiosNetworks = this.axios.create({
        baseURL: "http://devstack.local:9696",
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });

      axiosNetworks
        .get("/v2.0/floatingips")
        .then(response => {
          this.floatingIPs = response.data.floatingips;
          console.log("FI");
          console.log(this.floatingIPs);
          this.loaded++;

          if (this.loaded >= 5) {
            this.$toasted.show("Loading Complete").goAway(2000);
            this.$store.commit("loadingComplete", true);
          }
        })
        .catch(error => {
          console.log("Failed to load floatingips");
          console.log(error);
        });
    },
    loadFlavors: function() {
      var axiosFlavors = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });

      axiosFlavors
        .get("/compute/v2.1/flavors/detail")
        .then(response => {
          this.flavors = response.data.flavors;
          this.loaded++;

          if (this.loaded >= 5) {
            this.$toasted.show("Loading Complete").goAway(2000);
            this.$store.commit("loadingComplete", true);
          }
        })
        .catch(error => {
          console.log("Failed to load Flavors");
          console.log(error);
        });
    },
    loadInstances: function() {
      var axiosInstances = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });

      axiosInstances
        .get("/compute/v2.1/servers")
        .then(response => {
          this.instances = response.data.servers;
          this.loaded++;

          if (this.loaded >= 5) {
            this.$toasted.show("Loading Complete").goAway(2000);
            this.$store.commit("loadingComplete", true);
          }
        })
        .catch(error => {
          console.log("Failed to load Instances:");
          console.log(error);
        });
    },
    loadVolumes: function() {
      var axiosVolumes = this.axios.create({
        baseURL:
          "http://devstack.local/volume/v3/" +
          this.$store.state.currentProject +
          "/volumes",
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });
      axiosVolumes
        .get()
        .then(response => {
          this.volumes = response.data.volumes;
          this.loaded++;

          if (this.loaded >= 5) {
            this.$toasted.show("Loading Complete").goAway(2000);
            this.$store.commit("loadingComplete", true);
          }
        })
        .catch(error => {
          console.log("Failed to load Volumes:");
          console.log(error);
        });
    },
    selectTab: function(tab) {
      this.$store.commit("setSelectedTab", tab);
    },
    editInstance: function(instance) {
      console.log(instance);

      var axiosEditInstance = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });

      axiosEditInstance
        .get("/compute/v2.1/servers/" + instance.id)
        .then(response => {
          console.log("Instance Edit");
          this.selectedInstance = response.data.server;

          console.log(this.selectedInstance);
          this.$store.commit("setSelectedTab", "editInstance");
        })
        .catch(error => {
          console.log("Failed to delete Selected Instance");
          console.log(error);
        });
    },
    deleteInstance: function(instance) {
      var axiosDeleteInstance = this.axios.create({
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
          "x-auth-token": this.$store.state.token
        }
      });

      axiosDeleteInstance
        .delete("/compute/v2.1/servers/" + instance.id)
        .then(response => {
          console.log(response);
          this.reloadInstances();
        })
        .catch(error => {
          console.log("Failed to delete Selected Instance");
          console.log(error);
        });
    },
    reloadInstances() {
      this.loadInstances();
      this.selectTab("instances");
    },
    reloadVolumes() {
      this.loadVolumes();
      this.selectTab("volumes");
    },
    reloadFloatingIP() {
      this.loadFloatingIP();
      this.selectTab("floatingiptab");
    }
  },
  components: {
    createInstance: CreateInstanceComponent,
    editInstance: EditInstanceComponent,
    createVolume: CreateVolumeComponent,
    uploadImage: UploadImageComponent,
    dashboard: DashboardComponent,
    createFloatingIP: CreateFloatingIPComponent,
  },
  created() {
    this.$toasted.show("Loading...").goAway(2000);
    this.$store.commit("loadingComplete", false);

    this.loadImages();
    this.loadNetworks();
    this.loadFlavors();
    this.loadInstances();
    this.loadVolumes();
    this.loadFloatingIP();
  }
};
</script>