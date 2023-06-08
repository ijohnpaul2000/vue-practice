<template>
  <div>
    <p v-if="!reviewsContent.length">No Reviews Yet</p>

    <div class="reviewList">
      <ReviewItem v-for="(review, index) in reviewsContent" :key="index" :item="review" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import ReviewItem from './ReviewItem.vue'
import { useReviewsStore } from '@/stores/reviews'

const store = useReviewsStore()

const { reviewsContent } = storeToRefs(store)
</script>

<style scoped></style>
