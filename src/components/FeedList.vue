<template>
  <section>
    <ul class="grid gap-4 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <li v-for="item in store.feeds" :key="item.id">
        <FeedCard :item="item" />
      </li>
    </ul>
    <div ref="sentinel" class="h-6"></div>

    <div v-if="store.loading" data-test="loading" class="py-4 text-center text-gray-500">
      Loading...
    </div>

    <div v-if="store.error" data-test="error" class="py-4 text-center text-red-500">
      Error loading feeds
    </div>

    <div v-if="!hasMore && store.feeds.length" class="py-4 text-center text-gray-400">
      You're all caught up 🎉
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useFeedStore } from "../stores/feedStore";
import FeedCard from "./FeedCard.vue";

const store = useFeedStore();
const sentinel = ref(null);
const observer = ref(null);

const loadMore = async () => {
  if (store.loading || !store.hasMore) return;
  await store.fetchFeeds({ append: true });
};

onMounted(async () => {
  // initial load
  if (!store.feeds.length) await store.fetchFeeds({ append: false });

  // infinite scroll
  observer.value = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting) {
        await loadMore();
      }
    },
    { rootMargin: "400px" }
  );

  if (sentinel.value) observer.value.observe(sentinel.value);
});

onBeforeUnmount(() => {
  if (observer.value && sentinel.value) observer.value.unobserve(sentinel.value);
});

const hasMore = computed(() => store.hasMore);
</script>
