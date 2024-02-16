<script setup lang="ts">
import type { IFriend } from '~/server/types'

const res = ref('')

const friend = ref<IFriend>({
  title: 'test',
  bio: 'test',
  avatar: 'test',
  url: 'test',
  screenShot: 'test',
  status: 'ACTIVE',
})

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

  //   const { data } = useFetch('/api/user')
  //   const { data } = useFetch('/api/article/create', {
  //     method: 'POST',
  //     body: article,
  //   })

  //   const { data } = useFetch('/api/article/category/article')
  //   console.warn(data)
  const { data } = useFetch('/api/friend/create', {
    method: 'POST',
    body: friend.value,
  })
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
