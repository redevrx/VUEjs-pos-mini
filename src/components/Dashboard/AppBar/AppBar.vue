<template>
  <v-app-bar height="45px" max-height="55" color="#242526" dense dark>
    <v-icon class="mr-2" @click="onDrawerNva">menu</v-icon>
    <!-- <v-img src="@/assets/logo.svg" max-height="40" max-width="40"></v-img> -->
    <v-toolbar-title>POS</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- show user icons profile  -->
    <v-chip
      @click="hoverChip"
      dark
      class="myChip ma-2 mt-5 mb-5 mr-5"
      text-color="white"
    >
      <v-avatar left>
        <img src="@/assets/redev.png" />
      </v-avatar>
      Redev
    </v-chip>

    <v-badge
      class="myChip mt-5 mb-5 mr-2"
      :content="itemCart"
      color="red"
      overlap
      left
      bottom
    >
      <v-icon large @click="order">shop</v-icon>
    </v-badge>
    <!-- <v-avatar class="mt-5 mb-5 mr-1" rounded size="40" color="#4E4F50">
      <img src="@/assets/redev.png" />
    </v-avatar> -->

    <!-- show user name login  -->
    <!-- <span class="mt-5 mb-5 mr-5">Redev</span> -->
    <!-- btn user logout  -->
    <v-btn
      class="mt-5 mb-5"
      max-width="35"
      max-height="35"
      outlined
      fab
      dark=""
      color="#4E4F50"
      @click="logout"
    >
      <v-icon>logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  props: ["itemCart"],
  data() {
    return {};
  },
  methods: {
    onDrawerNva() {
      this.$store.dispatch(
        "onChangeDrawer",
        !this.$store.getters.getDrawerState
      );
    },
    logout() {
      this.$store
        .dispatch("logOut")
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hoverChip() {},
    order()
    {
      this.$store.dispatch("onCheckPage", "cart");
    }
  },
};
</script>

<style scoped>
.myChip {
  color: "#89aec5";
}
</style>
