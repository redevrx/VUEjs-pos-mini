<template>
  <v-container grid-list-xs>
    <v-row>
      <v-img src="@/assets/logo.png" max-height="50" max-width="50"></v-img>
      <p class="title">ReDev.com</p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginTitle",
};
</script>

<style scoped>
.title {
  color: azure;
  font-size: 40px;
  margin-top: 10;
  margin-left: 5px;
  padding-top: 10;
}
</style>
