<template>
  <v-app
    class="login"
    :style="{ backgroundImage: 'url(' + require('@/assets/Login.png') + ')' }"
  >
    <v-content>
      <Title />
      <LoginForm @onLogin="userLogin" />
    </v-content>
  </v-app>
</template>

<script>
import Title from "@/components/LoginUser/LoginTitle.vue";
import LoginForm from "@/components/LoginUser/LoginForm.vue";

export default {
  name: "Login",
  components: {
    Title,
    LoginForm,
  },

  methods: {
    userLogin(uEmail, uPass) {
      const data = { email: uEmail, password: uPass };
      this.$store
        .dispatch("Login", data)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: cover;
  transform: scale(1);
}
</style>
