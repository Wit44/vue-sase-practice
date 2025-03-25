<script setup lang="ts">
import type { FlightModel } from '@/models/flight.model';
import { FlightService } from '@/services/flight.service';
import axios from 'axios';
import { ref } from 'vue';

const flights = ref<FlightModel[]>()
FlightService.getFlights()
    .then(rsp => flights.value = rsp.data)
</script>

<template>
    <ul>
        <li v-for="f of flights" :key="f.id">{{ f.destination }} {{ f.flightNumber }} {{ f.plane }}</li>
    </ul>
</template>
 