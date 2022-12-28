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
        this.orgInfo = getOrganizationInfo(this.org_name);
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

    return orgInfo;
}

</script>

<template>
    <div>
        <h1>{{ this.orgInfo.value.name }}'s Info</h1>
        <ul>
            <li>Nome: {{ this.orgInfo.value.name }}</li>
            <li>Numero di impiegati: {{ this.orgInfo.value.employee_num }}</li>
        </ul>
    </div>
</template>
