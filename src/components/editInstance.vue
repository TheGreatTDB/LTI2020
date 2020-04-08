<template>
  <div>
    <br />
    <p>Instance Name:</p>
    <b-form-input class="w-25 mx-auto" v-model="currentInstance.name" placeholder="Instance Name" />
    <br/>
    <b-button  variant="outline-primary"  v-on:click.prevent="createInstance()">Create Instance</b-button>
  </div>
</template>
<script>
export default {
  props: ["currentInstance", "networks", "images", "flavors"],
  data: function() {
    return {
      instanceName: null,
      instanceImageRef: null,
      instanceFlavorRef: null,
      description: null
      //instanceNetworks: null,
      //instanceNetworksUuid: []
    };
  },
  methods: {
    createInstance: function() {
      var axiosEditInstance = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });

      axiosEditInstance
        .put("/compute/v2.1/servers/" + this.currentInstance.id, {
          server: {
            name: this.currentInstance.name
            // "description": "sdfasfsfa"
          }
        })
        .then(response => {
          console.log(response);
          this.$emit("reload-instances");
        })
        .catch(error => {
          console.log("Failed to create Instance");
          console.log(error);
        });
    }
  },
  created() {
    console.log("INSIDE EDIT INSTANCE");
    console.log(this.currentInstance);

    this.instanceName = this.currentInstance.name;
    this.instanceImageRef = this.currentInstance.image;
    this.instanceNetworks = this.currentInstance.networks;
    this.instanceFlavorRef = this.currentInstance.flavor;
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>