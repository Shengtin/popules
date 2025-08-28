<template>
  <section class="grid lg:grid-cols-12 gap-8">
    <!-- LEFT: main feed -->
    <aside class="xl:col-span-2 lg:col-span-3 hidden lg:flex">
      <div class="fixed h-screen flex flex-col justify-between py-4">
        <!-- TOP -->
        <div>
          <ul class="flex flex-col mb-2 menu-list" v-for="item in menuItems">
            <li :key="item.label" v-if="!item?.showOnMore || showMore" :class="item.onSelect ? 'bg-black/3' : ''">
              <img :src="item.icon" class="w-6 h-6" />
              <p class="font-poppins font-medium">{{ item.label }}</p>
            </li>
          </ul>

          <div class="mt-3">
            <button
              @click="toggleMore"
              class="flex items-center gap-2 font-poppins font-semibold w-full bg-transparent hover:bg-black/3 py-3 px-4 rounded-full cursor-pointer"
            >
              <span>{{ showMore ? "Less" : "More" }}</span>
              <svg
                v-if="!showMore"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
              <svg
                v-else
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>

          <hr class="border-0 h-px bg-black/10 my-4" />
          <p class="font-poppins text-gray-600">Join our community now!</p>
          <button
            class="font-poppins font-semibold mt-4 w-full py-2 border-1 bg-slate-950 text-white rounded-full hover:bg-white hover:text-slate-950 cursor-pointer"
          >
            Login
          </button>
        </div>

        <!-- BOTTOM -->
        <div
          class="sticky flex items-center bottom-8 gap-1 w-full bg-transparent hover:bg-black/3 py-1 px-4 rounded-full cursor-pointer"
          @click="handlePopover"
        >
          <button class="p-2">
            <svg
              class="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <div style="position: relative">
            <p class="font-poppins font-semibold">More</p>
            <div
              v-if="showPopover"
              ref="popoverRef"
              class="absolute bottom-full w-50 -translate-x-15 mb-8 px-4 py-3 bg-white rounded shadow text-sm z-10"
              @click.stop
            >
              <div class="flex flex-col mb-2">
                <div class="font-poppins font-medium p-2 cursor-pointer">About Us</div>
                <hr class="border-0 h-px bg-black/10 my-2" />
                <div class="font-poppins font-medium p-2 cursor-pointer">Privacy Policy</div>
                <hr class="border-0 h-px bg-black/10 my-2" />
              </div>
              <div class="flex items-center gap-4 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" :class="toggled ? 'text-gray-300' : 'text-black'">
                  <path
                    fill="currentColor"
                    d="M12 15q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15m0 1q-1.671 0-2.835-1.164Q8 13.67 8 12t1.165-2.835T12 8t2.836 1.165T16 12t-1.164 2.836T12 16M2 12.5q-.213 0-.356-.144t-.144-.357t.144-.356T2 11.5h2.5q.213 0 .356.144t.144.357t-.144.356t-.356.143zm17.5 0q-.213 0-.356-.144T19 11.999t.144-.356t.356-.143H22q.213 0 .356.144t.144.357t-.144.356T22 12.5zM12 5q-.213 0-.357-.144T11.5 4.5V2q0-.213.144-.356t.357-.144t.356.144T12.5 2v2.5q0 .213-.144.356T11.999 5m0 17.5q-.212 0-.356-.144T11.5 22v-2.5q0-.213.144-.356t.357-.144t.356.144t.143.356V22q0 .213-.144.356t-.357.144M6.362 7.03l-1.44-1.395q-.147-.14-.144-.344t.149-.37q.16-.165.354-.165t.354.165L7.05 6.342q.16.166.16.354q0 .189-.15.354t-.342.153t-.356-.172m12.004 12.048l-1.416-1.421q-.16-.166-.16-.357t.16-.351q.13-.165.327-.153q.196.013.362.172l1.44 1.397q.146.14.143.344t-.149.369q-.16.165-.354.165t-.354-.165M16.95 7.059q-.165-.15-.153-.34t.172-.358l1.397-1.44q.14-.146.344-.143t.369.149q.165.16.165.354t-.165.353L17.658 7.05q-.166.16-.354.16t-.354-.15M4.921 19.083q-.165-.17-.165-.364t.165-.353l1.421-1.416q.166-.16.357-.16q.192 0 .351.16q.146.13.134.327q-.013.196-.153.362l-1.397 1.44q-.159.165-.353.162q-.195-.002-.36-.158M12 12"
                  ></path>
                </svg>

                <button @click="toggled = !toggled" class="w-9 h-5 rounded-full relative transition-colors duration-200 bg-gray-300 cursor-pointer">
                  <span
                    :class="toggled ? 'translate-x-4.5' : 'translate-x-0.5'"
                    class="block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200"
                  ></span>
                </button>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" :class="!toggled ? 'text-gray-300' : 'text-black'">
                  <path
                    fill="currentColor"
                    d="M12.058 20q-3.333 0-5.667-2.334T4.058 12q0-2.47 1.413-4.535q1.414-2.067 4.01-2.973q.306-.107.536-.056t.381.199t.192.38q.04.233-.063.489q-.194.477-.282.971T10.158 7.5q0 2.673 1.863 4.537q1.864 1.863 4.537 1.863q.698 0 1.277-.148q.58-.148.988-.24q.218-.04.399.01t.292.176q.115.125.156.308t-.047.417q-.715 2.45-2.803 4.013T12.058 20"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- RIGHT: sidebar -->
    <div class="xl:col-span-10 lg:col-span-9">
      <div class="sticky top-[80px] grid grid-cols-12 bg-white z-20">
        <div class=" col-span-12">
          <div class="flex py-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <p
              v-for="item in filterFeed"
              :key="item.label"
              class="flex items-center rounded-full font-poppins font-medium px-4 py-2 capitalize cursor-pointer text-[#333c] hover:bg-black/3 shrink-0"
            >
              {{ item.label }}
            </p>
          </div>
        </div>
      </div>
      <FeedList />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import FeedList from "./FeedList.vue";
import { menuItems } from "../constants/menuItems";
import { filterFeed } from "../constants/filterFeed";

const toggled = ref(false);
const showMore = ref(false);
const showPopover = ref(false);
const popoverRef = ref(null);

const toggleMore = () => {
  showMore.value = !showMore.value;
};

const handlePopover = () => {
  showPopover.value = !showPopover.value;
};
</script>

<style scoped>
.menu-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 20px;
  border-radius: 8px;
  height: 48px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 9999px;
}

.menu-list li:hover {
  background-color: #00000008;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
