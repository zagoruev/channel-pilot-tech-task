<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useSize } from "@/composables/useSize";

const albums = ref<
  {
    id: number;
    title: string;
  }[]
>([
  {
    id: 1,
    title: "Lanscapes",
  },
  {
    id: 2,
    title: "Food",
  },
]);

const photos = ref<
  {
    id: number;
    url: string;
    description: string;
    albumId?: number;
  }[]
>([
  {
    id: 1,
    url: "//images.pexels.com/photos/12252216/pexels-photo-12252216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description:
      "Free stock photo of dawn, nature background, nature photography",
  },
  {
    id: 2,
    url: "//images.pexels.com/photos/12310319/pexels-photo-12310319.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "Free stock photo of berries, bowl of fruits, summer",
  },
  {
    id: 3,
    url: "//images.pexels.com/photos/12315780/pexels-photo-12315780.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "Mountain Tops Under Blue Sky",
  },
]);


const canvasConfig = computed(() => {
  return size;
});
});
</script>

<template>
  <div class="flex justify-center">
    <div class="min-h-screen flex py-6 relative" ref="container">
      <v-stage :config="canvasConfig" class="absolute inset-0">
        <v-layer>
        </v-layer>
      </v-stage>
      <div class="bg-gray-50 py-4 px-6 rounded mr-4 column">
        <h2 class="text-gray-700 font-semibold tracking-wide text-sm">
          Albums
        </h2>
        <div
          class="bg-white shadow rounded p-3 mt-3 border border-white relative select-none"
          v-for="album in albums"
          :key="album.id"
        >
          <p class="text-gray-700 font-semibold tracking-wide text-sm m-0">
            {{ album.title }}
          </p>
          <div
            class="connectror w-4 h-4 rounded-full bg-cyan-500 cursor-pointer absolute right-0 bottom-1/2 translate-x-1/2 translate-y-1/2 border border-white hover:scale-150 transition-all duration-200"
          ></div>
        </div>
      </div>
      <div class="bg-gray-50 py-4 px-6 rounded mr-4 column">
        <h2 class="text-gray-700 font-semibold tracking-wide text-sm">
          Photos
        </h2>
        <div
          class="bg-white shadow rounded mt-3 border relative select-none"
          v-for="photo in photos"
          :key="photo.id"
        >
          <img
            class="block rounded w-full h-32 object-cover object-center"
            :src="photo.url"
            :alt="photo.description"
          />
          <h3
            class="absolute inset-x-0 bottom-0 text-white px-2 pb-1 pt-4 bg-gradient-to-t from-black to-transparent rounded-b text-sm text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {{ photo.description }}
          </h3>
          <div
            class="connectror w-4 h-4 rounded-full border absolute bg-cyan-500 cursor-pointer right-full bottom-1/2 translate-x-1/2 translate-y-1/2 border-white hover:scale-150 transition-all duration-200"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  @apply font-sans text-gray-700 antialiased;
}
.column {
  min-width: 20rem;
  width: 20rem;
}
</style>
