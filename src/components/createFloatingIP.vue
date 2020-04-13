<template>
  <div>
    <br />
    <p>Pool:</p>
    <multiselect
      v-model="instanceNetworks"
      :options="filteredNetworks"
      :multiple="false"
      label="name"
      track-by="id"
      placeholder="Choose a Pool"
      :allow-empty="false"
      class="w-25 mx-auto"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        <span
          class="multiselect__single"
          v-if="values.length &amp;&amp; !isOpen"
        >{{ values.length }} options selected</span>
      </template>
    </multiselect>
    <p>Description:</p>
    <b-form-input class="w-25 mx-auto" v-model="description" placeholder="Small description" />
    <p />
    <b-button variant="outline-primary" v-on:click.prevent="createFloatingIP()">Create Floating IP</b-button>
  </div>
</template>
<script>
export default {
  props: ["networks"],
  data: function() {
    return {
      nameVolume: "",
      description: "",
      floating_network_id: null,
      tenant_id: null,
      instanceNetworks: null,
      externalNetworks: []
    };
  },
  computed: {
    filteredNetworks() {
      let networkprops = this.networks;
      networkprops.forEach(net => {
        if (net["router:external"]) {
          this.externalNetworks.push(net);
        }
      });
      return this.externalNetworks;
    }
  },
  methods: {
    createFloatingIP: function() {
      var axiosCreateInstance = this.axios.create({
        baseURL: this.axios.defaults.baseURL + ":9696",
        headers: {
          "x-auth-token": this.$store.state.token,
          "Content-Type": "application/json"
        }
      });

      axiosCreateInstance
        .post("/v2.0/floatingips", {
          floatingip: {
            tenant_id: this.$store.state.currentProject,
            floating_network_id: this.instanceNetworks.id,
            description: this.description
          }
        })
        .then(response => {
          console.log(response);
          this.$emit("reload-floatingIP");
        })
        .catch(error => {
          console.log("Failed to create FloatingIP");
          console.log(error);
        });
    },
  },
  created() {
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>