<script setup lang="ts">
import type { FlightModel } from '@/models/flight.model';
import { FlightService } from '@/services/flight.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';

const flights = ref<FlightModel[]>()
FlightService.getFlights()
    .then(rsp => flights.value = rsp.data)
</script>

<template>
    <div class="wrapper mb-3 mt-3" v-if="flights">
        <div class="card" style="width: 18rem;" v-for="f of flights" :key="f.id">
            <img :src="`https://img.pequla.com/destination/${f.destination.toLowerCase().split(' ')[0]}.jpg`"
                class="card-img-top" :alt="f.destination">
            <div class="card-body">
                <h5 class="card-title">{{ f.destination }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ f.flightNumber }}</h6>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="fa-solid fa-clock-rotate-left"></i> {{ formatTime(f.estimatedAt ?? f.scheduledAt) }}
                </li>
                <li class="list-group-item">
                    <i class="fa-solid fa-plane"></i> Plane: {{ f.plane }}
                </li>
                <li class="list-group-item">
                    <i class="fa-solid fa-circle-info"></i> {{ f.gate ? `Gate: ${f.gate}/ Terminal: ${f.terminal}` : 'Terminal: '+ f.terminal }}
                </li>
            </ul>
            <div class="card-body">
                <RouterLink :to="`/flight/${f.id}`" class="btn btn-sm btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i>Details
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
</style>
 