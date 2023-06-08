<template>
  <div class="feedback-stats">
    <h3>{{ reviewsCount ?? 'No' }} Review<span v-if="reviewsCount > 1">s</span></h3>
    <h4>Average Rating: {{ isNaN(averageRating) ? 0 : averageRating }}</h4>
  </div>
</template>

<script setup lang="ts">
import { useReviewsStore } from '@/stores/reviews'
import { storeToRefs } from 'pinia'
const store = useReviewsStore()

const { reviewsCount, averageRating } = storeToRefs(store)
</script>

<style scoped></style>
