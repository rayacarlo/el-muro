<template>
<v-container class="my-5" fluid>
  <v-row no-gutters>
    <v-col cols="3"></v-col>
    <v-col cols="6">
      <v-img src="@/assets/home.svg" max-height="240" contain="true"></v-img>
      <v-textarea outlined counter :rules="rules" class="mx-2 mt-4" label="Write a new post" v-model="post_text" rows="2" prepend-icon="mdi-comment" required></v-textarea>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn depressed align-end color="amber" @click="post">Post</v-btn>
      </v-layout>
      <ul class="list-unstyled" v-if="user">
        <li v-for="post in sortedList" :key="post.id">
          <v-card class="mx-auto mt-4" color="indigo darken-3" dark>
            <v-card-title class="headline"><avatar class="mr-2" v-if="user" :src="post.user.avatar" :size=40></avatar>{{ post.user.name }} says</v-card-title>
            <v-card-subtitle class="mt-2">{{ post.text }}</v-card-subtitle>
            <v-list-item class="grow">
              <v-row align="center" justify="end">
                <v-card-subtitle>{{ post.date }}</v-card-subtitle>
                <v-icon class="mr-1" @click.prevent="like(post.id)">mdi-heart</v-icon>
                <span class="subheading mr-2">{{ post.likes }}</span>
              </v-row>
            </v-list-item>
          </v-card>
        </li>
      </ul>
    </v-col>
    <v-col cols="3"></v-col>
  </v-row>
</v-container>

</template>

<script>
import Avatar from 'vue-avatar'
import firebase from 'firebase/app'; 
import { db } from '@/firebase';

const getDate = () => {
  const trailing = (d) => d.length < 10 ? '0'+d : d;
  const now = new Date();
  return `${now.getFullYear()}-${trailing(now.getMonth())}-${trailing(now.getDate())} ${trailing(now.getHours())}:${trailing(now.getMinutes())}:${trailing(now.getSeconds())}`;
}

export default {
  name: 'Home',
  components: {
    Avatar
  },
  data: () => ({
    rules: [v => v.length <= 120 || 'Max 120 characters'],
    post_text: '',
    posts: []
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
    sortedList: function() {
    return this.posts.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
  },
  methods: {
		post() {
      const user = firebase.auth().currentUser
      this.$firestore.posts.add({
        date: getDate(),
        text: this.post_text,
        user: {
          name: user.displayName,
          uid: user.uid,
          avatar: user.photoURL
        },
        likes: 0
      }),
      this.post_text = ""
    },
    like(post_id) {
      const post = this.posts.find(post => post.id == post_id);
      this.$firestore.posts.doc(post_id).update({
        likes: post.likes++
      });
    }
  },
  firestore() {
    return {
      posts: db.collection('posts')
    }
  }
}
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>