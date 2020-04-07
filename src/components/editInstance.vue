<template>
  <div>
    <br />
    <p>Instance Name:</p>
    <input v-model="currentInstance.name" placeholder="Instance Name" class="table table-striped" />
    
    <div class="table table-striped">
      <p>Select Image:</p>
      <multiselect
        v-model="currentInstance.image"
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

      <p>Select Flavor:</p>
      <multiselect
        v-model="currentInstance.flavor"
        :options="flavors"
        :multiple="false"
        label="name"
        track-by="name"
        placeholder="Pick 1 Flavor"
        class="table table-striped"
      >
        <template slot="selection" slot-scope="{ values, search, isOpen }">
          <span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
          >{{ values.length }} options selected</span>
        </template>
      </multiselect>

    <!--
      <p>Select(s) Network(s):</p>
      <multiselect
        v-model="instanceNetworks"
        :options="networks"
        :multiple="true"
        label="name"
        track-by="name"
        placeholder="Pick 1 or more Networks"
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
    </div>
    <b-button v-on:click.prevent="createInstance()">Create Instance</b-button>
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
          server: this.currentInstance
        })
        .then(response => {
          console.log(response);
          this.$emit("reload-instances");
        })
        .catch(error => {
          console.log("Failed to create Instance");
          console.log(error);
        });
    },
  },
  created(){
    console.log("INSIDE EDIT INSTANCE")
    console.log(this.currentInstance)

    this.instanceName = this.currentInstance.name;
    this.instanceImageRef = this.currentInstance.image;
    this.instanceNetworks = this.currentInstance.networks;
    this.instanceFlavorRef = this.currentInstance.flavor;


  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>