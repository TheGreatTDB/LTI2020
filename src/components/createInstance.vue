<template>
  <div>
    <br />
    <p>Instance Name:</p>
    <b-form-input class="w-25 mx-auto" v-model="instanceName" placeholder="Instance Name" />
    <div class="w-25 mx-auto table table-striped">
      <p>Select Image:</p>
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

      <p>Select Flavor:</p>
      <multiselect
        v-model="instanceFlavorRef"
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

      <p>Volume Size(Min: 1):</p>
      <b-form-input class="mx-auto" v-model="volumeSize" placeholder="Volume Size" />
    </div>

    <b-button variant="outline-primary"  v-on:click.prevent="createInstance()">Create Instance</b-button>
  </div>
</template>
<script>
export default {
  props: ["networks", "images", "flavors"],
  data: function() {
    return {
      instanceName: null,
      instanceImageRef: null,
      instanceFlavorRef: null,
      instanceNetworks: null,
      volumeSize: 1,
      instanceNetworksUuid: []
    };
  },
  methods: {
    createInstance: function() {
      var axiosCreateInstance = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });
      this.sortNetworks();

      axiosCreateInstance
        .post("/compute/v2.1/servers", {
          server: {
            name: this.instanceName,
            imageRef: this.instanceImageRef.id,
            flavorRef:
              "http://openstack.example.com/flavors/" +
              this.instanceFlavorRef.id,
            max_count: 1,
            min_count: 1,
            networks: this.instanceNetworksUuid,
            block_device_mapping_v2: [
              {
                uuid: this.instanceImageRef.id,
                source_type: "image",
                destination_type: "volume",
                boot_index: 0,
                volume_size: this.volumeSize
              }
            ],
            security_groups: [
              {
                name: "default"
              }
            ]
          }
        })
        .then(response => {
          console.log(response);
          this.$toasted.show('Instance Created!').goAway(4000)

          this.$emit("reload-instances");
        })
        .catch(error => {
          this.$toasted.show('Instance Error!' + error.response.data.badRequest.message).goAway(4000)
          console.log(error.response);
        });
    },
    sortNetworks: function() {
      console.log(this.instanceNetworks);

      this.instanceNetworks.forEach(network => {
        let aux = { uuid: network.id };
        this.instanceNetworksUuid.push(aux);
      });

      console.log(this.instanceNetworksUuid);
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>