<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters>
      <v-col cols="1"></v-col>
        <v-col cols="5">
          <v-card width="400" class="mx-auto mt-4" outlined>
            <v-alert type="error" v-if="error != null">
              {{ error }}
            </v-alert>
            <v-card-title>
              <h1 class="display-1">Registration</h1>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="Name" prepend-icon="mdi-account-circle" required v-model="registerName"/>
                <v-text-field label="Email" prepend-icon="mdi-at" required v-model="registerEmail"/>
                <v-text-field label="Password" :type="showRegistrationPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showRegistrationPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showRegistrationPassword = !showRegistrationPassword" required v-model="registerPassword"/>
                <v-text-field label="Confirm password" :type="showConfirmPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showConfirmPassword = !showConfirmPassword" required v-model="confirmPassword"/>
                <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar" v-model="registerAvatar"></v-file-input>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn depressed color="amber" @click="register">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card width="400" class="mx-auto mt-4" outlined>
            <v-alert type="error" v-if="error != null">
              I'm an error alert.
            </v-alert>
            <v-card-title>
              <h1 class="display-1">Login</h1>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="Email" prepend-icon="mdi-at" required v-model="loginEmail"/>
                <v-text-field label="Password" :type="showLoginPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showLoginPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showLoginPassword = !showLoginPassword" required v-model="loginPassword"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn depressed color="amber" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Auth',
  data: () => ({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    confirmPassword:'',
    registerAvatar: '',
    showRegistrationPassword: false,
    showConfirmPassword: false,
    loginEmail: '',
    loginPassword: '',
    showLoginPassword: false,
    rules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ],
  }),
  computed: {
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    register() {
      if (this.registerPassword != this.confirmPassword) {
        this.$store.commit('set_error', 'Both passwords must match');
        return;
      }
      const dataAuth = {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPassword,
        avatar: this.registerAvatar
      };
      this.$store.dispatch('register', dataAuth)
    },
    login() {
      const dataAuth = {
        email: this.loginEmail,
        password: this.loginPassword
      };
      this.$store.dispatch('login', dataAuth)
    }
  }
}
</script>