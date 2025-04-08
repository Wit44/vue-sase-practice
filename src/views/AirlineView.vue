<script lang="ts" setup>
import type { AirlineModel } from '@/models/airline.model';
import { AirlineService } from '@/services/airline.service';
import { AuthService } from '@/services/auth.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const airlines = ref<AirlineModel[]>()
AirlineService.getAirlines()
    .then(rsp => airlines.value = rsp.data)
    .catch(e=>{
        AuthService.removeAuth()
        router.push('/login')
    })

</script>

<template>
{{ airlines }}
</template>