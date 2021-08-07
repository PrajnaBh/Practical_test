<template>
  <div>
    <center>
      <h1>Welcome !!</h1>
      <h4>Your Stories</h4>

      <div>
        <table style="text-align: center">
          <tr>
            <th>ID</th>

            <th>Title</th>

            <th>UserId</th>
          </tr>
          <tr v-for="(post, index) in allPosts" v-bind:key="index">
            <td>{{ post.id }}</td>
            <td>
              {{ post.title }}
            </td>
            <td>{{ post.userId }}</td>
          </tr>
        </table>
        <br /><br />
        <input type="button" value="Create New Story" @click="createPost" />
        <div v-if="isnew">
          <h1>New Posts</h1>
          <table style="text-align: center">
            <tr>
              <th>ID</th>

              <th>Title</th>

              <th>UserId</th>
              <th>Body</th>
            </tr>
            <tr v-for="(post, index) in newPost" v-bind:key="index">
              <td>{{ post.id }}</td>
              <td>
                {{ post.title }}
              </td>
              <td>{{ post.userId }}</td>
              <td>{{ post.body }}</td>
            </tr>
          </table>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      userId: null,
      allPosts: [],
      newPost: [],
      isnew: false,
    };
  },
  methods: {
    createPost() {
      var t = this;
      axios({
        method: "post",
        url: "https://jsonplaceholder.typicode.com/posts",
        data: [
          {
            userId: t.userId,
            title: "This is Prajna",
            body: "Good Morning",
            id: "1",
          },
        ],
      })
        .then(function (response) {
          console.log(response);
          if (response.data) {
            t.isnew = true;
            t.newPost = response.data;
          }
        })
        .catch(function (e) {
          console.log(e);
        });
    },
    fetchPost() {
      var t = this;
      axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/todos/" + this.userId,
      })
        .then(function (response) {
          console.log(response);
          t.allPosts.push(response.data);
          console.log(t.allPosts);
          for (var i = 0; i < t.allPosts.length; i++) {
            console.log(t.allPosts[i].userId);
          }
        })
        .catch(function (e) {
          console.log(e);
        });
    },
  },
  mounted() {
    this.userId = this.$store.state.userId;
    console.log(this.userId);
    this.fetchPost();
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;

  padding: 8px;
  text-align: center;
}

tr:nth-child(even) {
  background-color: white;
}
</style>