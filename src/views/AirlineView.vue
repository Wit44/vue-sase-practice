<script lang="ts" setup>
import type { AirlineModel } from '@/models/airline.model';
import { AirlineService } from '@/services/airline.service';
import { ref } from 'vue';

const airlines = ref<AirlineModel[]>()
AirlineService.getAirlines()
    .then(rsp => airlines.value = rsp.data)

</script>

<template>
{{ airlines }}
</template>