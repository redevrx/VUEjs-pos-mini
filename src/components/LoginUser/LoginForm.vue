<template>
  <v-content>
    <v-container class="d-flex flex-row justify-center align-center">
      <v-card-title>
        <v-card round class="elevation-20">
          <center>
            <v-container class="flex-row  align-center">
              <v-row class="flex-row align-center pt-4 pl-8 pr-8 pb-0">
                <v-col >
                  <h1>Login Form</h1>
                  <p></p>
                  <center>
                    <h3>Sign in</h3>
                  </center>

                  <p></p>
                  <!-- show web name  -->
                  <!-- form get text email and password -->
                  <v-form>
                    <v-row>
                      <v-col>
                        <!-- txt email  -->
                        <v-text-field
                          class="mx-1"
                          flat=""
                          id=""
                          name=""
                          hide-details
                          label="Email"
                          v-model="txtEmail"
                          prepend-inner-icon="mdi-email"
                          solo-inverted
                        >
                        </v-text-field>
                        <p />

                        <!-- txtpassword  -->
                        <v-text-field
                          id="password"
                          flat=""
                          class="mx-1"
                          v-model="txtPassword"
                          solo-inverted
                          hide-details
                          label="Password"
                          name="password"
                          prepend-inner-icon="mdi-key"
                          type="password"
                        ></v-text-field>

                        <!-- btn login user  -->
                        <p></p>
                        <v-btn
                          class="ma-2"
                          :loading="loading4"
                          :disabled="loading4"
                          color="info"
                          @click="userLogin"
                        >
                          Login
                          <template v-slot:loader>
                            <span class="custom-loader">
                              <v-icon light>cached</v-icon>
                            </span>
                          </template>
                        </v-btn>
                        <br />
                        <p></p>
                        <!-- btn register user  -->
                        <v-btn
                          class="ma-2"
                          @click="$router.push('/register')"
                          tile
                          outlined
                          color="success"
                        >
                          <v-icon left>mdi-pencil</v-icon> Sign Up
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-container>
          </center>
        </v-card>
      </v-card-title>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      loader: null,
      loading4: false,
      txtEmail: "",
      txtPassword: "",
    };
  },
  methods: {
    userLogin() {
      this.loader = "loading4";
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
      this.$emit("onLogin", this.txtEmail, this.txtPassword);
      this.txtEmail = "";
      this.txtPassword = "";
    },
  },
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.rounded-card {
  border-radius: 50px;
}
</style>
