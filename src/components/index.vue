<template>
  <div class="index">

    <div v-if="this.$store.state.token == null">
      <img alt="Vue logo" src="./../assets/logo.png">
      <login />
    </div>

    <div v-if="this.$store.state.token != null">
      <menuNav />

      <div v-if="this.$store.state.currentProject != null">
        <projectDetails />
      </div>
    </div>

  </div>
</template>

<script>
  import LoginComponent from "./login";
  import MenuNavComponent from "./menuNav";
  import ProjectDetailsComponent from "./projectDetails";

export default {
  data: function() {
    return {
        isloggin: false
    }
  },
  methods: {

  },
  components:{
    login: LoginComponent,
    menuNav: MenuNavComponent,
    projectDetails: ProjectDetailsComponent,
  },
  created(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
