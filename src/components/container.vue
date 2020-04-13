<template>
    <div>
        <br/>
        <table
        v-if="this.containers != null && this.$store.state.selectedTab == 'listContainer'"
        class="table table-striped"
        >
        <tr>
            <th>Containers:</th>
        </tr>
        </table>
        <table
        v-if="this.containers != null && this.$store.state.selectedTab == 'listContainer'"
        class="table table-striped"
        >
        <thead>
            <tr>
            <th>UUID</th>
            <th>Name</th>
            <th>Memory</th>
            <th>Image</th>
            <th>Status</th>
            <th>Options</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="container in containers" :key="container.id">
            <td>{{ container.uuid }}</td>
            <td>{{ container.name }}</td>
            <td>{{ container.memory }}</td>
            <td>{{ container.image }}</td>
            <td>{{ container.status }}</td>
            <td>
                <b-button v-if="container.status == 'Stopped' || container.status == 'Created'" v-on:click.prevent="startContainer(container)">Start Container</b-button>
                <b-button v-if="container.status == 'Running'" v-on:click.prevent="stopContainer(container)">Stop Container</b-button>
                <b-button
                variant="outline-danger"
                v-on:click.prevent="deleteContainer(container)"
                >Delete Container</b-button>
            </td>
            </tr>
        </tbody>
        </table>

    <createContainer 
        @reload-containers="reloadContainers" v-if="this.$store.state.selectedTab == 'createContainer'"
        :images="images"/>
    </div>
</template>
<script>
import CreateContainerComponent from "./createContainer";
export default {
    props: ['images'],
    data: function() {
    return {
      containers: null
    };
  },
  methods: {
    loadContainers: function(){
    var axiosContainers = this.axios.create({
        baseURL: this.axios.defaults.baseURL + ":9517",
        headers: {
            "x-auth-token": this.$store.state.token
        }
    });

    axiosContainers
        .get("/v1/containers/")
        .then(response => {
            this.containers = response.data.containers;
            console.log(response)
        })
        .catch(error => {
            console.log("Failed to load Instances:");
            console.log(error);
        });
    },
    startContainer(container){
        var startContainer = this.axios.create({
            baseURL: this.axios.defaults.baseURL + ":9517",
            headers: {
            "x-auth-token": this.$store.state.token,
            "Content-Type": "application/json",
            Accept: "application/json"
            }
        });

        startContainer
            .post("/v1/containers/" + container.uuid + "/start")
            .then(response => {
                console.log(response);
                this.reloadContainers();
            })
            .catch(error => {
                console.log("Failed to delete Associate");
                console.log(error);
            });
    },
    stopContainer(container){
        var stopContainer = this.axios.create({
            baseURL: this.axios.defaults.baseURL + ":9517",
            headers: {
            "x-auth-token": this.$store.state.token,
            "Content-Type": "application/json",
            Accept: "application/json"
            }
        });

        stopContainer
            .post("/v1/containers/" + container.uuid + "/stop")
            .then(response => {
                console.log(response);
                this.reloadContainers();
            })
            .catch(error => {
                console.log("Failed to delete Associate");
                console.log(error);
            });
    },
    deleteContainer(container){
        var deleteContainer = this.axios.create({
            baseURL: this.axios.defaults.baseURL + ":9517",
            headers: {
            "x-auth-token": this.$store.state.token,
            "Content-Type": "application/json",
            Accept: "application/json"
            }
        });

        deleteContainer
            .delete("/v1/containers/" + container.uuid)
            .then(response => {
                console.log(response);
                this.reloadContainers();
            })
            .catch(error => {
                console.log("Failed to delete Associate");
                console.log(error);
            });
    },
    selectTab: function(tab) {
      this.$store.commit("setSelectedTab", tab);
    },
    reloadContainers(){
        this.loadContainers();
        this.selectTab("listContainer");
    }
  },
  components: {
      createContainer: CreateContainerComponent,
  },
  created(){
      this.loadContainers();
  }
}
</script>