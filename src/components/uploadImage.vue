<template>
  <div>
    <br />
    <label>
      File
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
    </label>
    <p>Image Name:</p>
    <input v-model="nameImage" placeholder="Image Name" />

    <b-button v-on:click.prevent="getImageID()">Upload Image</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      imageFile: ""
    };
  },
  methods: {
    handleFileUpload: function() {
      this.imageFile = this.$refs.file.files[0];
      console.log(this.imageFile);
    },
    uploadImage: function(idimage) {
      var axiosUploadImage = this.axios.create({
        headers: {
          "Content-Type": "application/octet-stream",
          Accept: "application/octet-stream",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

          "x-auth-token": this.$store.state.token
        }
      });
      axiosUploadImage
        .put("/image/v2/images/" + idimage + "/file", this.imageFile)
        .then(response => {
          console.log("SUCCESS!!");
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImageID() {
      var axiosIdImage = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token
        }
      });

      axiosIdImage
        .post("image/v2/images", {
          name: this.nameImage,
          disk_format: "iso",
          container_format: "bare"
        })
        .then(response => {
          console.log(response.data.id);
          this.uploadImage(response.data.id);
        })
        .catch(error => {
          console.log("Fail");
          console.log(error);
        });
    }
  }
};
</script>
