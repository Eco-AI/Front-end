<script>
import { ref } from "vue";
import {
    loggedUser
} from "../states/loggedUser.js";

export default {
    name: "TrashInfo",
    props: {
        plan_id: Number,
        trash_id: Number,
        zone_id: Number
    },
    data () {
        return {
            trash_info: getTrashInfo(this.plan_id, this.trash_id, this.zone_id)
        }
    }
}
const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

function getTrashInfo(plan_id, trash_id, zone_id) {
    console.log(trash_id)
    let trashInfo = ref({});

    fetch(API_URL + "/rifiuto/toclassify?" + new URLSearchParams({ id_zona: zone_id }), {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (json) {
            // turn the json in an array if it's not
            if (!Array.isArray(json)) {
                json = [json];
            }
            console.log(json)
            for (let i = 0; i < json.length; i++) {
                if (json[i]._id === trash_id) {
                    trashInfo.value = json[i];
                }
            }
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
    console.log(trashInfo)
    loggedUser.currentTrash = trash_id;
    return trashInfo;
};

function classifyTrash(trash_id) {
    fetch(API_URL + "/rifiuto/" + trash_id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token },
        body: JSON.stringify({
            classificazione: "classificato"
        })
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (json) {
            console.log(json)
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
};

</script>

<template>
    <form>
        <h1>Dettagli rifiuto non riconosciuto</h1>
        <ul>
            <li>ID: {{ this.trash_info._id }}</li>
            <li>Zona: {{ this.trash_info.id_zona }}</li>
            <li>Stato classificazione: {{ this.trash_info.classificazione }}</li>
            <li>Posizione rilevata: {{ this.trash_info.posizione }}</li>
            <button @click="classifyTrash(this.trash_info._id)">Classifica</button>
            <h2>Foto</h2>
            <img :src="this.trash_info.URL_foto" width="500" height="400">
        </ul>
    </form>
</template>
