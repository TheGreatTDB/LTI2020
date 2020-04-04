<template>
    <div>
        <br/>
        <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>

        <b-button v-on:click.prevent="uploadImage()">Upload Image</b-button>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            imageFile: ''
        };
    },
    methods: {
        handleFileUpload: function(){
            this.imageFile = this.$refs.file.files[0];
            console.log(this.imageFile);
        },
        uploadImage: function() {
            let formData = new FormData();
            formData.append('image', this.imageFile);

            var axiosUploadImage = this.axios.create({
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': this.$store.state.token,
                }
            })
            

            axiosUploadImage.post( '/image/v2/images', formData)
            .then(response => {
                console.log('SUCCESS!!');
                console.log(response);
            })
            .catch(error => {
                console.log('FAILURE!!');
                console.log(error);
            });
        }        
    }
    
}
</script>