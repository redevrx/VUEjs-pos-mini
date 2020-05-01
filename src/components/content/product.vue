<template>
  <v-container
    grid-list-xs
    class="d-flex flex-row justify-center align-center ml-5 mr-5"
  >
    <v-card
      width="100%"
      height="100%"
      style="background:#242526;color:white;"
      class="elevation-20"
    >
      <v-card-title class="ma-10">
        <v-container grid-list-xs>
          <v-row>
            <v-col>
              <h2 class="title pa-0 ma-0">PRODUCTS</h2>

              <!-- text view product id  -->
              <v-text-field
                class="inputField input-name mt-2 styled-input"
                dark=""
                label="Product ID"
                single-line
                v-model="txtProductID"
                solo
                clearable=""
                type="text"
                max-width="50"
              ></v-text-field>

              <!-- text view product name -->
              <v-text-field
                dark=""
                label="Product Name"
                single-line
                solo
                v-model="txtProductName"
                clearable=""
                type="text"
              ></v-text-field>

              <!-- text view total product -->
              <v-text-field
                dark=""
                label="Total Product"
                single-line
                solo
                v-model="txtProductTotal"
                clearable=""
                type="number"
              ></v-text-field>

              <!-- text view unit product -->
              <v-text-field
                dark=""
                label="Unit"
                single-line
                solo
                v-model="txtProductUnit"
                clearable=""
                type="text"
              ></v-text-field>

              <!-- text view price of product -->
              <v-text-field
                dark=""
                label="Price"
                single-line
                solo
                v-model="txtProductPrice"
                clearable=""
                type="number"
              ></v-text-field>

              <v-row>
                <v-col>
                  <!-- text view Images of product -->
                  <v-card class="mx-auto my-12 elevation-20" max-width="374">
                    <v-img height="250" :src="url"></v-img>
                  </v-card>

                  <!-- btn open image from local machine -->

                  <input type="file" dark @change="onFileSelect" />
                </v-col>
              </v-row>

              <v-row>
                <!-- btn save product info to db -->
                <v-spacer></v-spacer>
                <b-button
                  v-b-modal.modal-sm
                  variant="success"
                  class="align-centen:end"
                  >Save Data</b-button
                >
              </v-row>

              <b-modal @ok="onOkClick" id="modal-sm" size="sm" title="POS"
                >Do you want to continue?
              </b-modal>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Product",
  data() {
    return {
      selectImage: "",
      url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      txtProductID: "",
      txtProductName: "",
      txtProductTotal: "",
      txtProductUnit: "",
      txtProductPrice: "",
    };
  },
  methods: {
    onFileSelect() {
      this.selectImage = event.target.files[0];
      this.url = URL.createObjectURL(this.selectImage);
    },
    makeToast(variant = null, message) {
      this.$bvToast.toast(message, {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
    async onOkClick() {
      const data = {
        productId: this.txtProductID,
        productName: this.txtProductName,
        bal: this.txtProductTotal,
        unit: this.txtProductUnit,
        price: this.txtProductPrice,
        image: this.url,
      };
      await this.$emit("onSaveProduct", data , this.selectImage);
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  align-content: center;
  justify-content: center;
}
</style>
