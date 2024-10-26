<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const dataRef = ref({})
const name = ref('')
const password = ref('')

const handleCreateUser = async (data: { name: string; password: string }) => {
  const res = await fetch('http://localhost:8000/form/createUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: data?.name, password: data?.password }),
    credentials: 'include',
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error('Ошибка при создании пользователя:', error)
    })
  // dataRef.value = res
  // localStorage.setItem('user', JSON.stringify(res))
}
const handleGetUser = async (data: { name: string; password: string }) => {
  const res = await fetch('http://localhost:8000/form/getUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: data?.name, password: data?.password }),
    credentials: 'include',
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error('Ошибка при получении пользователя:', error)
    })
  dataRef.value = res
}
const handleGetUsers = async () => {
  const res = await fetch('http://localhost:8000/form/getUsers', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error('Ошибка при получении пользователей:', error)
    })

  console.log('Users', res)
}
const handleGetDecodedToken = async () => {
  const res = await fetch('http://localhost:8000/form/getDecodedToken', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error('Ошибка при получении расшифрованного токена:', error)
    })

  return res
}

watchEffect(async () => {
  const data = await handleGetDecodedToken()
  dataRef.value = data
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-semibold">Info: {{ JSON.stringify(dataRef) }}</h1>
  </div>

  <form
    @submit="e => e.preventDefault()"
    class="w-full max-w-2xl p-5 from-gray-800 to-green-800 bg-gradient-to-br rounded-2xl"
  >
    <div class="flex flex-col gap-4 items-center">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        class="w-full px-3 py-2 rounded-xl outline-none text-black"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full px-3 py-2 rounded-xl outline-none text-black"
      />

      <div class="flex gap-3">
        <button
          v-for="(button, index) in [
            { title: 'Create user', func: handleCreateUser },
            { title: 'Get user', func: handleGetUser },
            { title: 'Get users', func: handleGetUsers },
          ]"
          :key="index"
          class="px-3 py-2 rounded-xl bg-slate-600 w-fit"
          @click="() => button.func({ name, password })"
        >
          {{ button.title }}
        </button>
      </div>
    </div>
  </form>
</template>
