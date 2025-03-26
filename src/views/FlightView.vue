<script lang="ts" setup>
import type { FlightModel } from '@/models/flight.model';
import { FlightService } from '@/services/flight.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number(route.params.id)

const flight = ref<FlightModel>()

FlightService.getFlightById(id)
    .then(rsp => flight.value = rsp.data)
</script>

<template>
<pre>{{ flight }} </pre>
</template>