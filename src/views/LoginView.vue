<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()


function doLogin(e: Event) {
    e.preventDefault()

    if (email.value == '' || password.value == '') return

    MainService.login(email.value, password.value)
    .then(rsp => {
        AuthService.createAuth(rsp.data)
        router.push('/')
    })
    .catch(e=>alert('Check yo username or password'))
}
</script>

<template>
    <div class="auth-form">
        <div class="text-center">
            <h3>Ticket App</h3>
            <p>Security Aspects of SE.</p>
        </div>

        <form v-on:submit="e => doLogin(e)">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    </div>
</template>

<style>
.auth-from {
    max-width: 800px;
    text-align: auto;
    margin-left: auto;
    margin-right: auto;
}
</style>