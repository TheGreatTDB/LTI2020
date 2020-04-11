<template>
  <div>
    <br />
    <p>floating_network_id dropbox ou seja a pool:</p>
    <b-form-input class="w-25 mx-auto" v-model="nameVolume" placeholder="Volume Name" />
    <p>Description:</p>
    <b-form-input class="w-25 mx-auto" v-model="description" placeholder="Small description" />
    <p />
    <b-button variant="outline-primary" v-on:click.prevent="createFloatingIP()">Create Floating IP</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      nameVolume: "",
      description: "",
      floating_network_id: null,
      tenant_id: null
    };
  },
  methods: {
    createFloatingIP: function() {
      var axiosCreateInstance = this.axios.create({
        baseURL: "http://devstack.local:9696",
        headers: {
          "x-auth-token": this.$store.state.token,
          "Content-Type": "application/json"
        }
      });

      axiosCreateInstance
        .post("/v2.0/floatingips", {
          floatingip: {
            tenant_id: this.$store.state.currentProject,
            floating_network_id: "f8317863-1c61-42bc-a837-b3458d7b9411",
            description: this.description
          }
        })
        .then(response => {
          console.log(response);
          this.$emit("reload-floatingIP");
        })
        .catch(error => {
          console.log("Failed to create Volume");
          console.log(error);
        });
    }
    // teste: function() {
    //     console.log(this.instanceNetworks)

    //     this.instanceNetworks.forEach(network => {
    //         let aux = {uuid : network.id}
    //         this.instanceNetworksUuid.push(aux)
    //     })

    //     console.log(this.instanceNetworksUuid)
    // }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>