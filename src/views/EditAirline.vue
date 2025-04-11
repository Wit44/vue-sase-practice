<script lang="ts" setup>
import type { AirlineModel } from '@/models/airline.model';
import { AirlineService } from '@/services/airline.service';
import { AuthService } from '@/services/auth.service';
import { doLogout, formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const airline = ref<AirlineModel>()

AirlineService.getAirlineById(id)
    .then(rsp => airline.value = rsp.data)
    .catch(e => doLogout())

function doUpdate() {
    AirlineService.updateAirline(id, airline.value)
    .then(rsp=> router.push('/airline'))
    .catch(e => doLogout())
}
</script>

<template>
    <div class="custom-form" v-if="airline">
        <h1>Edit Airline</h1>
        <form v-on:submit.prevent="doUpdate">
            <div class="mb-3">
                <label for="id" class="form-label">ID:</label>
                <input type="number" class="form-control" id="id" :value="airline.airlineId" disabled>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control" id="name" v-model="airline.name">
            </div>
            <div class="mb-3">
                <label for="website" class="form-label">Website:</label>
                <input type="text" class="form-control" id="website" v-model="airline.website">
            </div>
            <div class="mb-3">
                <label for="updated" class="form-label">Updated At:</label>
                <input type="text" class="form-control" id="updated"
                    :value="formatTime(airline.updatedAt ?? airline.createdAt)" disabled>
            </div>
            <button class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>
</template>