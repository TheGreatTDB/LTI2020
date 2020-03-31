<template>
    <div>
        <h1 align="center">LOGIN</h1>
            <div class="form-group" v-if="this.projects != null">
                <label for="category_id">Project:
                    <select class="form-control" id="projects" name="projects" v-model="projects.name" @change="onChange($event)">
                        <option v-for="project in projects" :key="project.name" v-bind:value="project.id"> {{ project.name }} </option>
                    </select>
                </label>
            </div>
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
    props: [],
    data: function() {
        return {
            user: {
                username: null,
            },
            projects: null,
            projectSelected: null,
            username: "",
            password: "",
            token: null
        };
    },
    methods: {
        onChange(event){
            this.projectSelected = event.target.value;
        },
        test: function(){
            console.log(this.projectSelected)
        },
        getProjects: function(){
            this.axios.post("/identity/v3/auth/tokens", {
                auth: {
                    identity: {
                        methods: [
                            "password"
                        ],
                        password: {
                            user: {
                                name: "demo",
                                domain: {
                                    name: "Default"
                                },
                                password: "devstack"
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
                var axiosProjects = this.axios.create({
                    headers: {
                        'x-auth-token': response.headers['x-subject-token'],
                        'Content-Type': 'application/json'
                    }
                })

                axiosProjects.get('/identity/v3/auth/projects')
                .then(response => {
                    this.projects = response.data.projects;
                })
                .catch(error => {
                    console.log("Erro a fazer o pedido dos projetos")
                    console.log(error);
                })
            })
            .catch(error => {
                console.log("Erro a fazer o loging para fzr o pedido dos projetos")
                console.log(error);
            })
        },
        userLogin: function() {
            if(this.projectSelected != null){
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
                                id: this.projectSelected
                            }
                        }
                    }
                })
                .then(response =>{
                    console.log(response);

                    this.user.username = this.username;
                    this.$store.commit('setUser', this.user)

                    this.token = response.headers['x-subject-token'];
                    this.$store.commit('setToken', this.token);
                })
                .catch(error =>{
                    console.log("LOGIN ERROR");
                    console.log(error);
                })
            }
        }
    },
    created(){
        this.getProjects();
    }
}
</script>