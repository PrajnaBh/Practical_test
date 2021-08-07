<template>
  <div>
    <center>
      <h1>Hello there, login here to post your stories!!</h1>
      <div>
        <form @submit.prevent="checkUser">
          <label for="fname">Email Address</label><br /><br />
          <input type="text" name="email" v-model="emailAddress" /><br /><br />

          <input type="submit" value="Login" />
        </form>
      </div>
      <div v-if="isnotAuthenticated">
        <p style="color: red">{{ invalidUser }}</p>
      </div>
    </center>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      emailAddress: null,
      users: [],
      isnotAuthenticated: false,
      invalidUser: null,
    };
  },
  methods: {
    async checkUser() {
      try {
        let response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        // console.log(response.data);
        this.users = response.data;
        console.log(this.users);
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].email == this.emailAddress) {
            console.log("successfull login");
            this.$store.state.userId = this.users[i].id;
            this.$router.push("/UserPosts");
            return;
          }
          this.isnotAuthenticated = true;
          this.invalidUser = "Invalid user credential";
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
</style>