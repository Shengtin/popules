<template>
  <header class="sticky top-0 bg-white z-9999 border-b border-black/10">
    <nav class="relative max-w-[1720px] h-20 mx-auto px-4 px-6 h-16 grid grid-cols-12 items-center justify-between">
      <img src="/src/assets/icons/popules_logo.png" alt="Popules"
        class="col-span-6 lg:col-span-3 xl:col-span-2 max-h-8 sm:h-11 px-3" />

      <div class="hidden lg:grid lg:col-span-5 xl:col-span-6 items-center pl-2">
        <div class="relative w-120 h-10 flex justify-center items-center bg-gray-100 rounded-full px-2 py-1">
          <input v-model="query" @keyup.enter="onSearch" type="search" placeholder="Search..."
            class="w-full rounded-full focus:outline-none pl-5 pr-2" autocomplete="off" />
          <img v-if="query.length == 0" src="/src/assets/icons/search.png" class="absolute right-3 w-6 h-6" />
        </div>
      </div>

      <div class="hidden lg:flex col-span-4 items-center gap-3 justify-end">
        <button
          class="font-poppins px-5 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-500 cursor-pointer">Post</button>

        <button class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer" @click="handlePopover">
          <img src="/src/assets/icons/desktop-menu.png" class="w-6 h-6" />
        </button>

        <button class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
          <img src="/src/assets/icons/bell.png" class="w-6 h-6" />
        </button>

        <button class="p-2 items-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
          <img src="/src/assets/icons/profile.png" class="w-6 h-6" />
        </button>
      </div>

      <div class="flex lg:hidden col-span-6 items-center gap-3 justify-end">
        <img src="/src/assets/icons/search.png" class="right-3 w-6 h-6" />
        <button class="p-2 cursor-pointer" @click="handlePopover">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      <div v-if="showPopover" ref="popoverRef"
        class="absolute top-20 right-0 w-50 lg:w-80 -translate-x-2 bg-white rounded shadow text-sm z-10 p-5">
        <p class="hidden lg:block font-poppins font-semibold mb-7">Quick Access</p>
        <div class="flex flex-col lg:grid grid-cols-3 gap-4">
          <div v-for="item in menuItems" :key="item.label"
            class="flex p-2 lg:flex-col items-center gap-2 cursor-pointer lg:hover:bg-black/3 rounded border-b border-black/10 last:border-b-0 lg:border-none">
            <img :src="item.icon" class="w-6 h-6" />
            <p class="font-poppins text-sm">{{ item.label }}</p>
          </div>

          <div
            class="flex p-2 items-center gap-2 cursor-pointer rounded border-b border-black/10 last:border-b-0 lg:hidden">
            <img src="/src/assets/icons/setting.png" class="w-6 h-6" />
            <p class="font-poppins text-sm">Settings</p>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { menuItems } from "../constants/menuItems";

const query = ref("");
const showPopover = ref(false);
const popoverRef = ref(null);

const handlePopover = () => {
  showPopover.value = !showPopover.value;
};

const onSearch = () => {
};
</script>

<style scoped></style>
