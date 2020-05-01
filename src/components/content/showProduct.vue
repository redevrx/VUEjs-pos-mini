<template>
  <v-container>
    <v-card class="elevation-20">
      <v-data-table
        dark
        class="mytable"
        :headers="headers"
        :items="$store.getters.getProduct"
        sort-by="productId"
      >
        <!-- image  -->
        <template v-slot:item.image="{ item }">
          <div sm>
            <avatar dark>
              <img
                :src="
                  item.image
                    ? item.image
                    : 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
                "
                box
                sm
                width="50"
                height="50"
                dark
              />
            </avatar>
            <!-- <v-img class="pa-2" :src="item.image" sm height="50"></v-img> -->
          </div>
        </template>
        <template v-slot:top>
          <v-toolbar flat color="#1E1E1E">
            <v-toolbar-title style="color:white;">Product</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="#242526"
                  dark
                  class="mb-2"
                  v-on="on"
                  @click="onMoreEdit"
                  >New Item</v-btn
                >
              </template>

              <v-card dark>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.productId"
                          label="product ID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.productName"
                          label="Product Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.price"
                          label="Price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.bal"
                          label="Bal"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.unit"
                          label="Unit"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.image"
                          label="Image"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-img
                          width="80"
                          height="80"
                          :src="editedItem.image"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <input
                          type="file"
                          dark
                          @change="onFileSelect"
                          width="100"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="onEditImageClick"
                    >Save Image</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="#18191a" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "showProduct",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Product ID",
        align: "start",
        sortable: false,
        value: "productId",
      },
      { text: "Image", value: "image", sortable: false },
      { text: "Product Name", value: "productName" },
      { text: "Price", value: "price" },
      { text: "Bal", value: "bal" },
      { text: "Unit", value: "unit" },
      { text: "action", value: "actions", sortable: false },
    ],
    selectFile: null,
    editedIndex: -1,
    editedItem: {
      productId: "",
      productName: 0,
      price: 0,
      bal: 0,
      unit: 0,
      image: "",
    },
    defaultItem: {
      productId: "",
      productName: 0,
      price: 0,
      bal: 0,
      unit: 0,
      image: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    initialize() {
      this.$store.dispatch("onProductChange");
    },
    makeToast(variant = null, message) {
      this.$bvToast.toast(message, {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
    onMoreEdit() {
      this.$store.dispatch("onCheckPage", "product");
    },

    editItem(item) {
      this.editedIndex = this.$store.getters.getProduct.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;

      // .then(() => {
      //   alert("Hi");
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    },

    deleteItem(item) {
      const index = this.$store.getters.getProduct.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.$emit("onRemove", item._id);
      this.$store.getters.getProduct.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        this.$emit("onEditProduct", this.editedItem);
        Object.assign(
          this.$store.getters.getProduct[this.editedIndex],
          this.editedItem
        );
        // this.$emit("onEditProduct", this.editedItem);
      } else {
        this.$store.getters.getProduct.push(this.editedItem);
      }
      this.close();
    },
    onFileSelect() {
      this.selectFile = event.target.files[0];
      this.editedItem.image = URL.createObjectURL(event.target.files[0]); //URL.createObjectURL(event.target.files[0]);
    },
    onEditImageClick() {
      if (this.editedIndex > -1) {
        const formData = new FormData();
        formData.append("file", this.selectFile);
        formData.append("_id", this.editedItem._id);

        axios
          .put(
            "http://localhost:8082/pos/api/v1/product/edit/image",
            formData,
            {
              headers: {
                "auth-token": localStorage.getItem("access_token"),
              },
            }
          )
          .then(() => {
            this.$store.dispatch("onCheckPage", "showProduct");
            Object.assign(
              this.$store.getters.getProduct[this.editedIndex],
              this.editedItem
            );
            this.makeToast("success", "Update Image Successfuly..");
            console.log("OnEdit  Chage Image as the products");
          })
          .catch((err) => {
            this.makeToast("danger", "Failed.." + err.message);
            console.log(err);
          });
      } else {
        this.$store.getters.getProduct.push(this.editedItem);
      }

      this.close();
    },
  },
};
</script>
