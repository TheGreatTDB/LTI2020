<template>
    <div>
        <table class="table table-striped">
            <p />
            <p />
            <p />
            <p />
            <p />
            <p />
            <p />
            <p />
            <tr>
                <th>IMAGES:</th>
            </tr>
        </table>
            <table v-if="this.images != null" class="table table-striped">
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
            <table class="table table-striped">
                <tr>
                    <th>NETWORKS:</th>
                </tr>
            </table>
            <table v-if="this.networks != null" class="table table-striped">
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
            <table class="table table-striped">
                <tr>
                    <th>FLAVORS:</th>
                </tr>
            </table>
            <table v-if="this.flavors != null" class="table table-striped">
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
        </div>
</template>
<script>
export default {
    props: [],
    data: function() {
        return {
            images: null,
            networks: null,
            flavors: null,
            test: null
        };
    },
    methods: {
        loadImages: function() {
            var axiosImages = this.axios.create({
                headers: {
                    'x-auth-token': this.$store.state.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })

            axiosImages.get("/image/v2/images")
            .then(response => {
                this.images = response.data.images;
                console.log("Images: ")
                console.log(this.images)
            })
            .catch(error => {
                console.log("Failed to load Images")
                console.log(error)
            })
        },
        loadNetworks: function() {
            var axiosNetworks = this.axios.create({
                baseURL: "http://devstack.local:9696",
                headers: {
                    'x-auth-token': this.$store.state.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })

            axiosNetworks.get("/v2.0/networks")
            .then(response => {
                this.networks = response.data.networks;
                console.log("Networks: ")
                console.log(this.networks)
            })
            .catch(error => {
                console.log("Failed to load Networks")
                console.log(error)
            })
        },
        loadFlavors: function() {
            var axiosFlavors = this.axios.create({
                headers: {
                    'x-auth-token': this.$store.state.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })

            axiosFlavors.get("/compute/v2.1/flavors/detail")
            .then(response => {
                this.flavors = response.data.flavors;
                console.log("Flavors: ")
                console.log(this.flavors)
            })
            .catch(error => {
                console.log("Failed to load Flavors")
                console.log(error)
            })
        }
    },
    created(){
        this.loadImages();
        this.loadNetworks();
        this.loadFlavors();
    }   
    
}
</script>