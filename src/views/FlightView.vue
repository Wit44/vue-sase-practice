<script lang="ts" setup>
import type { FlightModel } from '@/models/flight.model';
import { FlightService } from '@/services/flight.service';
import { destinationImage, formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number(route.params.id)

const flight = ref<FlightModel>()

FlightService.getFlightById(id)
    .then(rsp => flight.value = rsp.data)
</script>

<template>
    <div v-if="flight">
        <div class="row mb-3">
            <div class="col-8">
                <img :src="destinationImage(flight)" :alt="flight.destination" class="img-fluid">
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        <h3>{{ flight.destination }}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <i class="fa-solid fa-hashtag"></i> Number: {{ flight.flightNumber }}
                            </li>
                            <li class="list-group-item"><i class="fa-solid fa-clock-rotate-left"></i> {{
                                formatTime(flight.estimatedAt ?? flight.scheduledAt) }}
                            </li>
                            <li class="list-group-item">
                                <i class="fa-solid fa-plane"></i> Plane: {{ flight.plane }}
                            </li>
                            <li class="list-group-item" v-if="flight.gate">
                                <i class="fa-solid fa-circle-info"></i> Gate: {{ flight.gate }}
                            </li>
                            <li class="list-group-item">
                                <i class="fa-solid fa-circle-info"></i> Terminal: {{ flight.terminal }}
                            </li>
                            <li class="list-group-item" v-if="flight.connectedType === '1'">
                                <i class="fa-solid fa-link"></i> Connected: {{ flight.connectedFlight }}
                            </li>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card">
                <iframe class="mx-auto" height="300"
                    :src="`https://www.google.com/maps?output=embed&q=${flight.destination}`" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade" id="gmaps"></iframe>
            </div>
        </div>
    </div>
</template>