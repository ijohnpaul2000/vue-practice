import { defineStore } from 'pinia'

export interface Review {
  id?: number
  text: string
  rating: number
}

interface reviewStore {
  reviews: Review[]
  editedData: {
    editable: boolean
    item: Review | null
  }
}

export const useReviewsStore = defineStore('review', {
  state: (): reviewStore => ({
    reviews: [],
    editedData: {
      editable: false,
      item: null
    }
  }),
  actions: {
    async addReview(review: Review) {
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      })

      if (response.ok) {
        const data = await response.json()
        this.reviews = [...this.reviews, data]
      }
    },
    async fetchReviews() {
      try {
        const reviews = await fetch('http://localhost:5000/reviews?_sort=id&_order=desc', {
          method: 'GET'
        })

        if (reviews.ok) {
          const data = await reviews.json()
          this.reviews = data
        }
      } catch (error) {
        console.log(error)
      }
    },
    editReview(review: Review) {
      const editedData = {
        editable: true,
        item: review
      }

      this.editedData = editedData
    },
    async updateReview(review: Review) {
      const response = await fetch(`http://localhost:5000/reviews/${review.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      })

      if (response.ok) {
        const data = await response.json()
        const index = this.reviews.findIndex((item) => item.id === data.id)
        this.reviews[index] = data
      }

      const editedData = {
        editable: false,
        item: null
      }

      this.editedData = editedData
    },
    async deleteReview(review: Review) {
      const response = await fetch(`http://localhost:5000/reviews/${review.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        this.reviews = this.reviews.filter((item) => item.id !== review.id)
      }
    }
  },
  getters: {
    averageRating(state) {
      if (state.reviews.length === 0) {
        return 0
      }

      const sum = state.reviews.reduce((acc, review) => {
        return acc + review.rating
      }, 0)

      return sum / state.reviews.length
    },
    reviewsCount(): number {
      return this.reviews.length
    },
    reviewsContent(): Review[] {
      return this.reviews
    },
    editedContent(): reviewStore['editedData'] {
      return this.editedData
    }
  }
})
