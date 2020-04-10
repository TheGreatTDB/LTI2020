<template>
  <div>
    <br />
    <label>
      <div>
        <b-form-input v-model="nameImage" placeholder="Image Name"></b-form-input>
      </div>
      <div>
        <b-form-group label="Image File:" label-for="file-large" label-cols-sm="0" label-size="lg">
          <b-form-file
            v-model="file"
            placeholder="Choose Image"
            drop-placeholder="Drop file here..."
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
          ></b-form-file>
        </b-form-group>
        <select v-model="format" >
          <option disabled value="">Please select one</option>
          <option :value="'iso'">ISO</option>
          <option :value="'ploop'">PLOOP</option>
          <option :value="'qcow2'">QCOW2</option>
          <option :value="'raw'">RAW</option>
          <option :value="'vdi'">VDI</option>
          <option :value="'vdh'">VDH</option>
          <option :value="'vmdk'">VMDK</option>
          <option :value="'aki'">AKI</option>
          <option :value="'ami'">AMI</option>
          <option :value="'ari'">ARI</option>
        </select>
      </div>

      <!-- <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" /> -->
    </label>
    <div>
      <b-button variant="outline-primary" v-on:click.prevent="getImageID()">Upload Image</b-button>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      imageFile: "",
      nameImage: "",
      format: "",
      file: null
    };
  },
  methods: {
    handleFileUpload: function() {
      // this.file = this.$refs.file.files[0];
      console.log(this.file);
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
        .put("/image/v2/images/" + idimage + "/file", this.file)
        .then(response => {
          console.log("SUCCESS!!");
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImageID() {
      if(this.format != "" && this.nameImage != "" && this.file != ""){
        var axiosIdImage = this.axios.create({
          headers: {
            "x-auth-token": this.$store.state.token
          }
        });

        axiosIdImage
          .post("image/v2/images", {
            name: this.nameImage,
            visibility: "shared",
            container_format: "bare",
            disk_format: this.format
          })
          .then(response => {
            console.log(response);
            this.uploadImage(response.data.id);
          })
          .catch(error => {
            console.log("Fail");
            console.log(error);
          });
      }else{
        console.log("MOSTRA AQUI O ERRO!")
      }

    }
  }
};
</script>
