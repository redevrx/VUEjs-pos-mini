<template>
  <v-app
    class="register"
    :style="{
      backgroundImage: 'url(' + require('@/assets/Register.svg') + ')',
    }"
  >
    <v-content>
      <Title />
      <RegisterForm @onSingUp="userRegister" />
    </v-content>
  </v-app>
</template>

<script>
import Title from "@/components/LoginUser/LoginTitle.vue";
import RegisterForm from "../components/Register/RegisterForm.vue";
export default {
  name: "Register",
  components: { Title, RegisterForm },
  methods: {
    userRegister(userInfo) {
      this.$store
        .dispatch("onRegister", userInfo)
        .then(() => {
          alert("Create User Account Successfully...");
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          alert("Create User Account Error...");
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: cover;
  transform: scale(1);
}
</style>
