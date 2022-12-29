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

<template>
    <div>
        <h1>Robots ({{ this.listRobots.length }})</h1>
        <ul>
            <li v-for="robot in this.listRobots" :key="robot">
                <RouterLink :to="'/robots/' + robot">{{ robot }}</RouterLink>
            </li>
            <h3 v-if="this.listRobots.length == 0">No robots</h3>
        </ul>
    </div>
</template>
