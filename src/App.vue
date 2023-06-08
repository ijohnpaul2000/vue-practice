<script setup lang="ts">
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

import { useReviewsStore } from '@/stores/reviews'

const store = useReviewsStore()

onMounted(() => {
  store.fetchReviews()
})
</script>

<template>
  <div class="">
    <Header />
    <RouterView />
  </div>
</template>

<style></style>
