<template>
  <div class="w-25 mx-auto table table-striped">
    <p>Container Name:</p>
    <b-form-input v-model="nameContainer" placeholder="Container Name" />

    <p>Cpus: (Min: 1 and Max: 2)</p>
    <b-form-input v-model="nCpu" placeholder="Number of CPUs" />

    <p>Memory (Min 4 MB):</p>
    <b-form-input v-model="memory" placeholder="Memory(MB)" />

    <p>Select Image:</p>
    <b-form-select v-model="instanceImageRef">
      <option :value="'cirros'">Cirros(Glance)</option>
      <option :value="'gbraad/openstack-client:alpine'">Alpine(Docker Hub)</option>
      <option :value="'nginx'">Nginx(Docker Hub)</option>
      <option :value="'ubuntu'">Ubuntu(Docker Hub)</option>
      <option :value="'postgres'">Postgres(Docker Hub)</option>
    </b-form-select>

    <!--
        <multiselect
            v-model="instanceImageRef"
            :options="images"
            :multiple="false"
            label="name"
            track-by="name"
            placeholder="Pick 1 Image"
            class="table table-striped"
        >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span
                class="multiselect__single"
                v-if="values.length &amp;&amp; !isOpen"
            >{{ values.length }} options selected</span>
            </template>
        </multiselect>
    -->

    <p>Select Image Driver:</p>
    <b-form-select v-model="driver">
      <option :value="'docker'">Docker Hub</option>
      <option :value="'glance'">Glance</option>
    </b-form-select>

    <p />
    <b-button variant="outline-primary" v-on:click.prevent="createContainer()">Create Container</b-button>
  </div>
</template>
<script>
export default {
  props: ["images"],
  data: function() {
    return {
      nameContainer: null,
      nCpu: null,
      memory: null,
      instanceImageRef: "cirros",
      driver: "docker"
    };
  },
  methods: {
    createContainer: function() {
      var axiosCreateContainer = this.axios.create({
        baseURL: this.axios.defaults.baseURL,
        headers: {
          "x-auth-token": this.$store.state.token,
          "Content-Type": "application/json"
        }
      });

      // this.teste();

      axiosCreateContainer
        .post("/container/v1/containers", {
          name: this.nameContainer,
          image: this.instanceImageRef,
          command: "/bin/bash",
          cpu: this.nCpu,
          memory: this.memory,
          image_driver: this.driver
        })
        .then(response => {
          console.log(response);
          this.$emit("reload-containers");
        })
        .catch(error => {
          console.log("Failed to create Container");
          console.log(error);
        });
    }
  }
};
</script>