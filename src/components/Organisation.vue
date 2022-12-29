<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import {
  loggedUser
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

let listOrganisations = ref([]);
const organization_name = ref("");
const employee_number = ref("");
const warningMessage = ref('')
const successMessage = ref('')

function getOrganisations() {
  fetch(API_URL + "/utente/organisations", {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      listOrganisations.value = data.nomi_organizzazioni;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

function addOrganisationButton() {
  addOrganisation(organization_name.value, employee_number.value).catch(err => console.log(err))
}

async function addOrganisation(name, employee_number) {
  let response = await fetch(API_URL + "/organisation", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token },
    body: JSON.stringify({ name: name, employee_num: employee_number })
  })

  if (response.ok) {
    successMessage.value = "Organizzazione creata con successo"
  } else {
    warningMessage.value = "Errore nella creazione dell'organizzazione"
  }
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
  <form>
    <h1> Crea un'organizzazione </h1>
    <br />
    <div style="float:left;margin-right:20px;">
      <label> Nome organizzazione </label>
      <input v-model="organization_name" placeholder="Nome" />
      <button type="button" @click="addOrganisationButton">Crea organizzazione</button>
    </div>
    <div style="float:left;margin-right:20px;">
      <label> Numero di impiegati </label>
      <input v-model="employee_number" placeholder="0" />
    </div>

    <br />
    <span style="color: red"> {{ warningMessage }} </span>
    <span style="color: white"> {{ successMessage }} </span>
  </form>
</template>
