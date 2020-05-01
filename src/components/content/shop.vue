<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="(it, i) in $store.getters.getProduct" :key="i">
        <v-card dark class="mx-auto elevation-20" max-width="344">
          <v-img
            :src="
              it.image
                ? it.image
                : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
            "
          ></v-img>

          <v-card-title>{{ it.productName }}</v-card-title>

          <v-card-subtitle>{{ it.price }}</v-card-subtitle>

          <v-card-actions>
            <v-spacer></v-spacer>
            <b-button class="w-50" @click="check(it)" pill variant="outline-primary">Cart</b-button>
            <!-- <v-btn color="purple" text @click="check(i)">
              Explore
            </v-btn>-->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Shop",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("onProductChange");
    this.$store.dispatch("onSaleChange");
  },
  methods: {
    check(data) {
      this.$emit("onAddCart", data);
    }
  }
};
</script>

<style></style>
