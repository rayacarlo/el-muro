import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import './firebase.js'
import 'firebase/auth'

import VueFirestore from 'vue-firestore'
import App from './App.vue'
import router from '@/router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'});

const store = new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  mutations: {
    set_user(state, new_user) {
      state.user = new_user;
    },
    set_error(state, new_error) {
      state.error = new_error;
    }
  },
  actions: {
    register(context, data) {
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(function (response) {
        console.log(response);
        firebase.auth().currentUser.updateProfile({
          displayName: data.name,
          photoURL: data.avatar
        })
      })
      .then((response) => {
        console.log(response)
        context.commit('set_error', null);
        context.commit('set_user', {email: data.email, name: data.name, avatar: data.avatar});
        router.push('/home');
      })
      .catch(function (error) {
        context.commit('set_error', error.message);
        context.commit('set_user', null);
      });
    },
    login(context, data) {
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(function (response) {
        console.log(response);
        var name = firebase.auth().currentUser.displayName;
        var avatar = firebase.auth().currentUser.photoURL;
          context.commit('set_error', null);
          context.commit('set_user', {email: data.email, name: name, avatar: avatar});
          router.push('/home');
      })
      .catch(function(error) {
        context.commit('set_error', error.message);
        context.commit('set_user', null);
      })
    },
    logout(context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('set_error', null);
        context.commit('set_user', null);
        router.push('/');
      })
    }
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')