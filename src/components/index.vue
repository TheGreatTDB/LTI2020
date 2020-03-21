<template>
  <div class="index">
    
  </div>
</template>

<script>
export default {
  name: 'index',
  props: [],
  methods: {
    getToken: function(){
      console.log(this.$store);
      this.$store.commit("setToken", "my Name is jeez");
      console.log(this.$store);
    }
  },
  created(){
    this.getToken();
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
