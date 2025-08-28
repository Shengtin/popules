<template>
  <div>
    <img
      :src="item.thumbnail"
      @error="(event) => (event.target.src = 'https://placehold.co/300x300/f3f4f6/d1d5dc/?text=Image+not+found&font=poppins')"
      class="rounded-2xl min-h-[300px] max-h-[345px] w-full object-cover hover:brightness-90 transition-all cursor-pointer"
    />
    <div class="p-[12px]">
      <p class="overflow-hidden line-clamp-2 text-sm mb-[8px] font-poppins font-medium">{{ item.title }}</p>
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center max-w-[calc(100%-1.5rem)]">
          <img
            :src="item.thumbnail"
            @error="(event) => (event.target.src = 'https://placehold.co/300x300/f3f4f6/d1d5dc/?text=Image+not+found&font=poppins')"
            class="rounded-full w-5 h-5 object-cover "
          />
          <p class="truncate max-w-[180px]">{{ item.user.username }}</p>
        </div>
        <span class="flex items-center gap-1">
          <span class="shrink-0 stroke-[1.3px] text-transparent stroke-gray-500" style="width: 1.35em; height: 1.35em; display: inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M16.696 3C14.652 3 12.887 4.197 12 5.943C11.113 4.197 9.348 3 7.304 3C4.374 3 2 5.457 2 8.481s1.817 5.796 4.165 8.073S12 21 12 21s3.374-2.133 5.835-4.446C20.46 14.088 22 11.514 22 8.481S19.626 3 16.696 3"
              ></path>
            </svg>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ item: Object });
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
