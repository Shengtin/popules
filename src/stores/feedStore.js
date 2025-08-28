import { defineStore } from 'pinia'
import axios from 'axios'

export const useFeedStore = defineStore('feed', {
  state: () => ({
    feeds: [],
    loading: false,
    error: null,
    offset: 0,
    limit: 15,
    hasMore: true,
  }),
  actions: {
    async fetchFeeds({ append = false } = {}) {
      if (this.loading) return
      this.loading = true
      this.error = null

      try {
        const res = await axios.get('https://api.popules.com/api/feed', {
          params: { offset: this.offset, limit: this.limit },
        })

        // API shape might be {data: [...], total: N} or simply array — adapt as necessary
        const incoming = Array.isArray(res.data) ? res.data : (res.data.data || [])

        if (append) {
          this.feeds = [...this.feeds, ...incoming]
        } else {
          this.feeds = incoming
        }

        // advance offset only when we successfully got items
        if (incoming.length > 0) {
          this.offset += incoming.length
        }

        // if fewer than limit returned -> no more
        this.hasMore = incoming.length === this.limit

      } catch (err) {
        this.error = err?.message || String(err)
      } finally {
        this.loading = false
      }
    },

    // reset (useful when switching filters/search)
    reset() {
      this.feeds = []
      this.offset = 0
      this.hasMore = true
      this.error = null
    }
  }
})
