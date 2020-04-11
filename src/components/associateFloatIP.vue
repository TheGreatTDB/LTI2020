<template>
  <div>
    <br />
    <p>Choose an Instance:</p>
    <br />
    <multiselect
      v-model="instanceSelected"
      :options="instances"
      :multiple="false"
      label="name"
      track-by="id"
      placeholder="Pick 1 instance"
      class="w-25 mx-auto"
      @click="getPortID()"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        <span
          class="multiselect__single"
          v-if="values.length &amp;&amp; !isOpen"
        >{{ values.length }} options selected</span>
      </template>
    </multiselect>
    <b-button variant="outline-primary" v-on:click.prevent="getPortID()">Associate Floating IP</b-button>
  </div>
</template>
<script>
export default {
  props: ["floatIPID", "instances"],
  data: function() {
    return {
      instanceSelected: null,
      portID: null
    };
  },

  methods: {
    getPortID: function() {
      var axiosInstances = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });
      axiosInstances
        .get(
          "/compute/v2.1/servers/" + this.instanceSelected.id + "/os-interface"
        )
        .then(response => {
          this.portID = response.data.interfaceAttachments[0].port_id;
          console.log("port id");
          console.log(this.portID);
          this.associateIP();
        })
        .catch(error => {
          console.log("Failed to get of instance Port ID:");
          console.log(error);
        });
    },

    associateIP: function() {
      var axiosCreateInstance = this.axios.create({
        baseURL: "http://devstack.local:9696",
        headers: {
          "x-auth-token": this.$store.state.token,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });

      axiosCreateInstance
        .put("/v2.0/floatingips/" + this.floatIPID, {
          floatingip: {
            port_id: this.portID
          }
        })
        .then(response => {
          this.$emit("reload-floatingIP");
          console.log(response);
          this.$toasted.show("A Floating IP was associated").goAway(10000);

        })
        .catch(error => {
          this.$toasted.show("Instance Already has a Floating IP Associated").goAway(10000);
          console.log("Failed to associate FloatingIP");
          console.log(error);
        });
    }
  },
  created() {}
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>