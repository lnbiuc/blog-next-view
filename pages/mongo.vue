<script setup lang="ts">
const res = ref('')
async function handleClick() {
//   const { data, refresh } = await useFetch('/api/user')
  //   console.log(data)

  //   const data = useFetch('/api/user/create', {
  //     method: 'POST',
  //     body: {
  //       nickname: 'violet',
  //       password: 'Dd112211',
  //     },
  //   })

  const { data } = useFetch('/api/user')

  console.warn(data)
}
</script>

<template>
  <div>
    <p>{{ res }}</p>
    <MyButton class="w-30" @click="handleClick">
      click
    </MyButton>
  </div>
</template>
