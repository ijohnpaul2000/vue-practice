<template>
  <Card>
    <button class="close" @click="deleteReview(item)">
      <i class="fas fa-times"></i>
    </button>
    <button class="edit" @click="editReview(item)">
      <i class="fas fa-edit"></i>
    </button>

    <div class="num-display">
      <!-- {{ item.rating }} -->
      {{ item.rating }}
    </div>
    <div class="text-display">
      {{ item.text }}
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from './shared/Card.vue'
import type { Review } from '@/stores/reviews'
import { useReviewsStore } from '../stores/reviews'
import type { PropType } from 'vue'

const { editReview, deleteReview } = useReviewsStore()

defineProps({
  item: {
    type: Object as PropType<Review>,
    required: true
  }
})
</script>

<style scoped></style>
<div></div>
