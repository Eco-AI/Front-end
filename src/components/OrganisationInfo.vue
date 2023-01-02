<script>
import { ref, onMounted } from "vue";
import {
    loggedUser
} from "../states/loggedUser.js";

export default {
    name: "OrganisationInfo",
    props: {
        org_name: String,
        org_info: Object
    },
    created () {
        console.log("PLEASE WORK: " + this.org_name)
        this.org_info = getOrganizationInfo(this.org_name);
        console.log(this.orgInfo)
    },
}


const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

function getOrganizationInfo(name) {
    console.log(name)
    let orgInfo = ref({});
    fetch(API_URL + "/organisation/" + name + "/info", {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (json) {
            orgInfo.value = json.data;
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
    
    loggedUser.currentOrganisation = name;
    return orgInfo;
};

</script>

<script setup>

function deleteOrganization(name) {
    console.log("bruh")
    fetch(API_URL + "/organisation/" + name, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
    }).catch((error) => console.error(error)); // If there is any error you will catch them here

    loggedUser.currentOrganisation = undefined;
};

</script>

<template>
    <form>
        <h1>Benvenuto a {{ this.orgInfo.value.name }}</h1>
        <ul>
            <li>Nome: {{ this.orgInfo.value.name }}</li>
            <li>Numero di impiegati: {{ this.orgInfo.value.employee_num }}</li>
        </ul>
        <br>
        <button type="button" @click="deleteOrganization(this.orgInfo.value.name)">Elimina organizzazione</button>    
    </form>
</template>
