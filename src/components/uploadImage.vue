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
      let formData = new FormData();
      formData.append("image", this.imageFile);

      var axiosUploadImage = this.axios.create({
        headers: {
          "Content-Type": "application/octet-stream",
          "x-auth-token": this.$store.state.token
        },
        data: {}
      });
      axiosUploadImage
        .put("/image/v2/images/" + idimage + "/file", formData)
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
          name: this.nameImage
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
