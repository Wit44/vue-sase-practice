<script lang="ts" setup>
import type { AirlineModel } from '@/models/airline.model';
import { AirlineService } from '@/services/airline.service';
import { ref } from 'vue';
import { doLogout, formatTime } from '@/utils';

const airlines = ref<AirlineModel[]>()
AirlineService.getAirlines()
    .then(rsp => airlines.value = rsp.data)
    .catch(e => doLogout())

async function doDelete(airline: AirlineModel) {
    try {
        if (!confirm(`Are you sure you want to delete ${airline.name}?`)) return
        await AirlineService.deleteAirline(airline.airlineId)
        airlines.value = airlines.value?.filter(a => a.airlineId !== airline.airlineId)
    } catch {
        doLogout()
    }
}

</script>

<template>
    <div>
        <h3>Airlines</h3>
        <RouterLink to="/airline/new" class="btn btn-sm btn-primary">
            <i class="fa-solid fa-plus"></i> Add Airline
        </RouterLink>
    </div>
    <table class="table table-striped table-hover" v-if="airlines">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Website</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="a of airlines" :key="a.airlineId">
                <th scope="row">{{ a.airlineId }}</th>
                <td>{{ a.name }}</td>
                <td>
                    <a :href="a.website">{{ a.website }}</a>
                </td>
                <td>{{ formatTime(a.updatedAt ?? a.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/airline/${a.airlineId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button class="btn btn-sm btn-danger" @click="doDelete(a)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>