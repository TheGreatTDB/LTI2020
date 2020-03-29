<template>
    <div>
        <h1 align="center">LOGIN</h1>
            <div class="inputField">
                <label for="username">Username:</label>
                <input
                    type="text"
                    :username="username"
                    v-model="username"
                    @input="$emit('input', $event.target.value)"
                />
            </div>  
            <br>
            <div class="inputField">
                <label for="password">Password:</label>
                <input
                    type="password"
                    :password="password"
                    v-model="password"
                    @input="$emit('input', $event.target.value)"
                />
            </div>
            <hr />
            <button type="submit" class="btn btn-primary" v-on:click.prevent="userLogin()">
                Login
            </button>
    </div>
</template>
<script>
export default {
    props: ["host"],
    data: function() {
        return {
            username: "",
            password: "",
            token: null
        };
    },
    methods: {
        test: function(){
            console.log(this.username)
            console.log(this.password)
        },
        userLogin: function() {
            this.axios.post("/identity/v3/auth/tokens", {
                auth: {
                    identity: {
                        methods: [
                            "password"
                        ],
                        password: {
                            user: {
                                name: this.username,
                                domain: {
                                    name: "Default"
                                },
                                password: this.password
                            }
                        }
                    },
                    scope: {
                        project: {
                            id: "6f022e51c85c45abb004b1d8150f4c25"
                        }
                    }
                }
            })
            .then(response =>{
                console.log(response);
                this.token = response.headers['x-subject-token'];   //JESUS QUE DEU LUTA!!!

                console.log(this.token);

                //this.$store.commit('setToken', this.token)
            })
            .catch(error =>{
                console.log("LOGIN ERROR");
                console.log(error);
            })
        }
    }
}
</script>