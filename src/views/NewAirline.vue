<script lang="ts" setup>
import { AirlineService } from '@/services/airline.service';
import { doLogout } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const airline = ref({
    name: '',
    website: ''
})

function doCreate() {
    AirlineService.createAirline(airline.value)
        .then(rsp => router.push('/airline'))
        .catch(e => doLogout())
}
</script>

<template>
    <div class="custom-form" v-if="airline">
        <h1>Create Airline</h1>
        <form v-on:submit.prevent="doCreate">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control" id="name" v-model="airline.name">
            </div>
            <div class="mb-3">
                <label for="website" class="form-label">Website:</label>
                <input type="text" class="form-control" id="website" v-model="airline.website">
            </div>
            <button class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>
</template>