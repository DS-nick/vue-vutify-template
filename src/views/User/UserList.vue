<template>
  <v-card>
    <v-data-table v-if="desserts" :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      headers: [
        {
          value: "email",
          text: "Email"
        },
        {
          value: "name",
          text: "name"
        }
      ],
      desserts: null
    };
  },
  methods: {
    ...mapActions("user", ["getUsers"])
  },
  async created() {
   
    await this.getUsers();
  }
};
</script>

<style scoped></style>
