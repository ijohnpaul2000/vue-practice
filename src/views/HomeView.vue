<template>
  <div class="home">
    <div class="container">
      <!-- Reviews Form -->
      <ReviewsForm />
      <!-- Review Stats -->
      <ReviewStats />
      <!-- Review List -->
      <ReviewList />
    </div>
  </div>
</template>

<script setup lang="ts">
import ReviewsForm from '../components/ReviewsForm.vue'
import ReviewStats from '@/components/ReviewStats.vue'
import ReviewList from '@/components/ReviewList.vue'
</script>
