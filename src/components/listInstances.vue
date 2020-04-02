<template>
    <div>
        <table class="table table-striped">
            <br>
            <tr>
                <th>Instances:</th>
            </tr>
        </table>
        <table v-if="this.instances != null" class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="instance in instances" :key="instance.id">
                    <td>{{ instance.id }}</td>
                    <td>{{ instance.name }}</td>
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
            instances: null,
            test: null
        };
    },
    methods: {
        loadInstances: function() {
            var axiosInstances = this.axios.create({
                headers: {
                    'x-auth-token': this.$store.state.token,
                    // 'Content-Type': 'application/json',
                    // 'Accept': 'application/json',
                }
            })

            axiosInstances.get("/compute/v2.1/servers")
            .then(response => {
                this.instances = response.data.servers;
                console.log("Instances: ")
                console.log(this.instances)
            })
            .catch(error => {
                console.log("Failed to load Instances:")
                console.log(error)
            })
        },
    },
    created(){
        this.loadInstances();
        console.log("lol")

    }   
    
}
</script>