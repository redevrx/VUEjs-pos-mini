<template>
  <v-container
    grid-list-xs
    class="d-flex flex-row justify-center align-center"
  >
    <v-card-title>
      <v-card class="elevation-20">
        <center>
          <v-container grid-list-xs class="pt-4 pl-8 pr-8 pb-0">
            <v-row>
              <v-col>
                <h1>Sign Up</h1>
                <br />
                <!-- user form  -->
                <v-form>
                  <v-row>
                    <v-col>
                      <!-- txt anme  -->
                      <v-text-field
                        label="First Name"
                        flat=""
                        solo-inverted
                        class="mx-1"
                        hide-details=""
                        type="text"
                        v-model="txtName"
                        prepend-inner-icon="person"
                      ></v-text-field>

                      <!-- last anme  -->
                      <p></p>
                      <v-text-field
                        label="Last Name"
                        class="mx-1"
                        flat=""
                        v-model="txtLastName"
                        solo-inverted=""
                        hide-details=""
                      ></v-text-field>

                      <!-- txt email  -->
                      <p></p>
                      <v-text-field
                        label="Email"
                        class="mx-1"
                        flat=""
                        v-model="txtEmail"
                        solo-inverted=""
                        hide-details=""
                        type="email"
                        prepend-inner-icon="email"
                      ></v-text-field>

                      <!-- txt password  -->
                      <p></p>
                      <v-text-field
                        label="Password"
                        flat=""
                        v-model="txtPassword"
                        solo-inverted=""
                        hide-details=""
                        type="password"
                        class="mx-1"
                        prepend-inner-icon="lock"
                      ></v-text-field>

                      <p></p>
                      <v-row
                        class="d-flex flex-row justify-center align-center"
                      >
                        <!-- btn login user  -->

                        <v-btn
                          class="ma-2"
                          @click="$router.push('/')"
                          tile
                          outlined
                          color="success"
                        >
                          Login
                        </v-btn>

                        <!-- dialog  user sign up -->
                        <v-btn
                          class="ma-2 white--text"
                          :loading="loading4"
                          :disabled="loading4"
                          color="#FF416C"
                          @click="userSignUp"
                        >
                          Sign Up
                          <template v-slot:loader>
                            <span class="custom-loader">
                              <v-icon light>cached</v-icon>
                            </span>
                          </template>
                        </v-btn>
                      </v-row>
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
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      loader: null,
      loading4: false,
      dialog: false,
      txtName: "",
      txtLastName: "",
      txtEmail: "",
      txtPassword: "",
      userInfo: [],
    };
  },
  methods: {
    userSignUp() {
      this.userInfo = {
        name: this.txtName,
        lastName: this.txtLastName,
        email: this.txtEmail,
        password: this.txtPassword,
      };

      this.$emit("onSingUp", this.userInfo);
      this.loader = "loading4";
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
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
</style>
