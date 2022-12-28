<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import {
  loggedUser
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

let listOrganisations = ref([]);

function getOrganisations() {
  fetch(API_URL + "/utente/organisations", {
    method: "GET",
    headers: { "Content-Type": "application/json" , "x-access-token": loggedUser.token}
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      listOrganisations.value = data.nomi_organizzazioni;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

onMounted(() => {
  getOrganisations();
});

</script>

<template>
    <div>
        <h1>Organisations</h1>
        <ul>
            <li v-for="org in listOrganisations" :key="org">
                <RouterLink :to="'/organisations/' + org + '/info'">{{ org }}</RouterLink>
            </li>
        </ul>
    </div>
</template>
