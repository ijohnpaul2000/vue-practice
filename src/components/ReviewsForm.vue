<template>
  <Card>
    <form @submit.prevent="handleSubmit">
      <h2>How would you rate your service with us?</h2>
      <!-- Raating Component -->
      <rating-select :rating="rating" @setRating="setRating" />
      <div class="input-group">
        <input type="text" placeholder="Write a review" v-model="text" />
        <button type="submit" class="btn btn-primary" :disabled="btnDisabled">Submit</button>
      </div>
      <div class="message" v-if="message != ''">
        {{ message }}
      </div>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import RatingSelect from './RatingSelect.vue'
import Card from './shared/Card.vue'
import { useReviewsStore } from '../stores/reviews'
import { storeToRefs } from 'pinia'

const store = useReviewsStore()
const { editedContent } = storeToRefs(store)

const text = ref('')
const message = ref('')
const btnDisabled = ref(false)
const rating = ref(10)

watch(editedContent, (newData) => {
  if (newData.editable && newData.item) {
    text.value = newData.item.text
    rating.value = newData.item.rating
  } else {
    text.value = ''
    rating.value = 10
  }
})

watch(text, (newVal) => {
  if (newVal.trim().length <= 10) {
    btnDisabled.value = true
    message.value = 'Text must be at least 10 characters'
  } else {
    btnDisabled.value = false
    message.value = ''
  }
})

const setRating = (val: number) => {
  rating.value = val
  console.log(val)
}

const handleSubmit = async () => {
  const newReview = {
    text: text.value,
    rating: rating.value
  }

  if (!editedContent.value.editable) {
    console.log('ADDING REVIEW')
    store.addReview(newReview)
  } else {
    console.log('UPDATING REVIEW')
    store.updateReview({
      ...newReview,
      id: editedContent?.value?.item?.id
    })
  }
}
</script>

<style scoped></style>
