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

          this.makeToast();
        })
        .catch(error => {
          console.log("LOGIN ERROR");
          console.log(error);
          this.ErrorToast(error);
        });
    },
    makeToast() {
      this.$bvToast.toast(`Login Successfull `, {
        title: "Login Successfull",
        autoHideDelay: 5000
      });
    },
    ErrorToast(error) {
      this.$bvToast.toast(`${error}`, {
        title: "Login Error",
        autoHideDelay: 5000
      });
    }
  }
};
</script>
