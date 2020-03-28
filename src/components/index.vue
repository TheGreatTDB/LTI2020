<template>
  <div class="index">
    <login />
  </div>
</template>

<script>
  import LoginComponent from "./login";

export default {
  data: function() {
    return {

    }
  },
  methods: {

  },
  components:{
    login: LoginComponent,
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
