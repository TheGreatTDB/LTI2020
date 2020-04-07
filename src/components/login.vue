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
        @keyup.enter="userLogin()"
      />
    </div>
    <br />
    <div class="inputField">
      <label for="password">Password:</label>
      <input
        type="password"
        :password="password"
        v-model="password"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="userLogin()"
      />
    </div>
    <br />
    <button type="submit" class="btn btn-primary" @click="userLogin()">Login</button>
  </div>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      user: {
        username: null,
        password: null
      },
      username: "",
      password: "",
      token: null
    };
  },
  methods: {
    userLogin: function() {
      this.axios
        .post("/identity/v3/auth/tokens", {
          auth: {
            identity: {
              methods: ["password"],
              password: {
                user: {
                  name: this.username,
                  domain: {
                    name: "Default"
                  },
                  password: this.password
                }
              }
            }
          }
        })
        .then(response => {
          console.log(response);

          this.user.username = this.username;
          this.user.password = this.password;
          this.$store.commit("setUser", this.user);

          this.token = response.headers["x-subject-token"];
          this.$store.commit("setToken", this.token);

          this.$toasted.show('Login Successfull!').goAway(2000)
        })
        .catch(error => {
          this.$toasted.show('Login Error!').goAway(2000);
          this.$toasted.show(error).goAway(2000);
        });
    }
  }
};
</script>
