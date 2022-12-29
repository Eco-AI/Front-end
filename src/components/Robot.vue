<script>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import {
  loggedUser
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

export default {
    name: "Robot",
    props: {
        org_name: String
    },
    data () {
        return {
            listRobots: getRobots(this.org_name)
        }
    }
}

function getRobots(name) {
  let listRobots = ref([]);
  fetch(API_URL + "/organisation/" + name + "/robots", {
    method: "GET",
    headers: { "Content-Type": "application/json" , "x-access-token": loggedUser.token}
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      listRobots.value = data;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here

    console.log(listRobots)
    return listRobots;
}

</script>

<script setup>

const id_robot = ref("");
const warningMessage = ref('')
const successMessage = ref('')

function addRobotButton(org) {
    warningMessage.value = ""
    successMessage.value = ""

    addRobot(id_robot.value, org).catch(err => console.log(err))
}

async function addRobot(id, org) {
    let response = await fetch(API_URL + "/organisation/" + org + "/robots?" + new URLSearchParams({ id_robot: id }), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' , 'x-access-token': loggedUser.token }
    })

    if (response.ok) {
        let json = await response.json();
        console.log(json);

        successMessage.value = 'Robot associato con successo a ' + org
    } else {
        if (response.status == 404) {
            warningMessage.value = "Robot non trovato"
        } else if (response.status == 409) {
            warningMessage.value = "Robot già associato ad un'organizzazione"
        } else {
            warningMessage.value = "Errore sconosciuto"
        }
    }
}

</script>

<template>
    <div>
        <h1>Robots ({{ this.listRobots.length }})</h1>
        <ul>
            <li v-for="robot in this.listRobots" :key="robot">
                <RouterLink :to="'/organisations/' + this.org_name + '/robots/' + robot">{{ robot }}</RouterLink>
            </li>
            <h3 v-if="this.listRobots.length == 0">No robots</h3>
        </ul>
    </div>
    <form>
        <h1> Aggiungi un robot </h1>
            <br />
            <div style="float:left;margin-right:20px;">
                <label> ID Robot </label>
                <input v-model="id_robot" placeholder="ID" />
                <button type="button" @click="addRobotButton(this.org_name)">Associa robot</button>
            </div>
            
            <br />
            <span style="color: red"> {{ warningMessage }} </span>
            <span style="color: white"> {{ successMessage }} </span>
        </form>
</template>
