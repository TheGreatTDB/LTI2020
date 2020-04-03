<template>
    <div>
        <br />
        Hello World!

        <multiselect v-model="instanceNetworks" :options="networks" :multiple="true" label="name" track-by="name">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
        </multiselect>

        <b-button v-on:click.prevent="createInstance()">createInstance!</b-button>
    </div>
</template>
<script>
export default {
    props: ['networks'],
    data: function() {
        return {
            instanceName: null,
            instanceImageRef: null,
            instanceFlavorRef: null,
            instanceNetworks: null,
            instanceNetworksUuid: []
        };
    },
    methods: {
        createInstance: function() {
            var axiosCreateInstance = this.axios.create({
                headers: {
                    'x-auth-token': this.$store.state.token,
                }
            })

            this.teste();

            axiosCreateInstance.post("/compute/v2.1/servers", {
                server: {
                    name: "Teste Create function",
                    imageRef: "9c7991a8-ba6b-40fe-a211-1824d59f300a",
                    flavorRef: "http://openstack.example.com/flavors/1",
                    networks : this.instanceNetworksUuid
                }
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log("Failed to create Instance");
                console.log(error)
            })
        },
        teste: function() {
            console.log(this.instanceNetworks)

            this.instanceNetworks.forEach(network => {
                let aux = {uuid : network.id}
                this.instanceNetworksUuid.push(aux)
            })

            console.log(this.instanceNetworksUuid)
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>