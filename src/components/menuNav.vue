<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <a class="navbar-brand mr-1">
        <h1 style="color:white;">
          <img
            v-on:click.prevent="profile()"
            height="60"
            width="60"
            src="./../assets/OpenStack-Logo-Mark.png"
          />
          Welcome, {{ this.$store.state.user.username }}
        </h1>
      </a>

      <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
        <i class="fas fa-bars"></i>
      </button>

      <div v-if="projectSelected != null && this.$store.state.load == true">
        <b-button
          variant="outline-danger"
          v-on:click.prevent="selectTab('createInstance')"
        >Create Instance</b-button>|
      </div>

      <div v-if="projectSelected != null && this.$store.state.load == true">
        <b-button
          variant="outline-danger"
          v-on:click.prevent="selectTab('createVolume')"
        >Create Volume</b-button>|
      </div>
      <div v-if="projectSelected != null && this.$store.state.load == true">
        <b-button
          variant="outline-danger"
          v-on:click.prevent="selectTab('uploadImage')"
        >Upload Image</b-button>
      </div>

      <!-- Navbar Search -->
      <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
        <div v-if="this.$store.state.isEdditingProfile == false" class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button v-on:click.prevent class="btn btn-primary" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>

      <!-- Navbar -->
      <ul class="navbar-nav ml-auto ml-md-0">
        <b-navbar-nav>
          <b-nav-item-dropdown v-if="projectSelected != null && this.$store.state.load == true" text="Show Details" right>
            <b-dropdown-item v-on:click.prevent="selectTab('instances')">Instances</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="selectTab('images')">Images</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="selectTab('networks')">Networks</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="selectTab('flavors')">Flavors</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="selectTab('volumes')">Volumes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>Projects:</b-nav-item>
          <select
            v-if="this.projects != null"
            v-model="projectSelected"
            class="form-control"
            name="project_id"
            id="project_id"
            @change="selectProject($event)"
          >
            <option
              v-for="project in projects"
              :key="project.id"
              v-bind:value="project.id"
            >{{project.name}}</option>
          </select>
          <b-nav-item-dropdown text="Account" right>
            <b-dropdown-item v-on:click.prevent="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: [],
  data: function() {
    return {
      projects: null,
      projectSelected: null
    };
  },
  methods: {
    loadProjects: function() {
      var axiosProjects = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });

      axiosProjects
        .get("/identity/v3/auth/projects")
        .then(response => {
          this.projects = response.data.projects;
        })
        .catch(error => {
          console.log("Failed to load Projects");
          console.log(error);
        });
    },
    selectTab: function(tab) {
      this.$store.commit("setSelectedTab", tab);
    },
    selectProject: function(event) {
      if (this.projectSelected != null) {
        this.$store.commit("clearCurrentProject");
      }

      this.projectSelected = event.target.value;

      this.axios
        .post("/identity/v3/auth/tokens", {
          auth: {
            identity: {
              methods: ["password"],
              password: {
                user: {
                  name: this.$store.state.user.username,
                  domain: {
                    name: "Default"
                  },
                  password: this.$store.state.user.password
                }
              }
            },
            scope: {
              project: {
                id: this.projectSelected
              }
            }
          }
        })
        .then(response => {
          this.$store.commit("setToken", response.headers["x-subject-token"]);
          this.$nextTick().then(() => {
            this.$store.commit("setCurrentProject", this.projectSelected);
          });
        })
        .catch(error => {
          console.log("Error Selecting Project");
          console.log(error);
        });
    },
    logout: function() {
      this.$store.commit("clearCurrentProject");
      this.$store.commit("clearUser");
      this.$store.commit("clearToken");
    }
  },
  created() {
    if (this.$store.state.user == null) {
      this.$store.commit("loadUser");
    }

    this.loadProjects();
  }
};
</script>