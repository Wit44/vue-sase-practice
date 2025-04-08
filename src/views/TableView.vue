<script lang="ts" setup>
import type { FlightModel } from '@/models/flight.model';
import { AuthService } from '@/services/auth.service';
import { FlightService } from '@/services/flight.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const flights = ref<FlightModel[]>()

FlightService.getFlights()
    .then(rsp => flights.value = rsp.data)
    .catch(e=>{
        AuthService.removeAuth()
        router.push('/login')
    })

</script>

<template>
    <table class="table table-striped table-hover" v-if="flights">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Destination</th>
                <th scope="col">Flight number</th>
                <th scope="col">Flight key</th>
                <th scope="col">scheduled At</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="f of flights" :key="f.id">
                <th scope="row">{{ f.id }}</th>
                <td>{{f.destination}}</td>
                <td>{{f.flightNumber}}</td>
                <td>{{ f.flightKey }}</td>
                <td>{{ f.scheduledAt }}</td>
                <td>{{ formatTime(f.estimatedAt ?? f.scheduledAt) }}</td>
                <td>
                    <template v-if="f.estimatedAt">
                        <i class="fa-solid fa-circle text-warning"></i> On Time
                    </template>
                    <template v-else>
                        <i class="fa-solid fa-circle text-success"></i> On Time
                    </template>
                    
                </td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/flight/${f.id}`" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </RouterLink>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>