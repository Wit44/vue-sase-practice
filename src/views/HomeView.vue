<script setup lang="ts">
import type { FlightModel } from '@/models/flight.model';
import { FlightService } from '@/services/flight.service';
import { destinationImage, formatTime } from '@/utils';
import { ref } from 'vue';

const flights = ref<FlightModel[]>()
FlightService.getFlights()
    .then(rsp => flights.value = rsp.data)

    function doSearch(e: any) {
        console.log(e.target.value)
    }
</script>

<template>
    <div class="input-group mb-3">
        <span class="input-group-text" id="search">
            <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input type="text" class="form-control" aria-describedby="search" placeholder="🔎 Destination, Flight number..." @keyup="(e) => doSearch(e)">
    </div>
    <div class="wrapper mb-3" v-if="flights">
        <div class="card flight-card" v-for="f of flights" :key="f.id">
            <img :src="destinationImage(f)" class="card-img-top" :alt="f.destination">
            <div class="card-body">
                <h5 class="card-title">{{ f.destination }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ f.flightNumber }}</h6>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="fa-solid fa-clock-rotate-left"></i> {{ formatTime(f.estimatedAt ??
                    f.scheduledAt) }}
                </li>
                <li class="list-group-item">
                    <i class="fa-solid fa-plane"></i> Plane: {{ f.plane }}
                </li>
                <li class="list-group-item">
                    <i class="fa-solid fa-circle-info"></i> {{ f.gate ? `Gate: ${f.gate}/ Terminal: ${f.terminal}` :
                    'Terminal: '+ f.terminal }}
                </li>
            </ul>
            <div class="card-body">
                <RouterLink :to="`/flight/${f.id}`" class="btn btn-sm btn-primary"><i
                        class="fa-solid fa-arrow-up-right-from-square"></i>Details
                </RouterLink>
            </div>
        </div>
    </div>
    <div v-else>Loading data...</div>
</template>

<style>
.wrapper {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.flight-card {
    width: 300px;
}
</style>