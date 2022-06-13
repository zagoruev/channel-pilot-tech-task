<template>
  <div class="bg-white shadow rounded mt-3 border relative select-none">
    <img
      class="block rounded w-full h-32 object-cover object-center"
      :src="photo.url"
      :alt="photo.title"
    />
    <h3
      class="absolute inset-x-0 bottom-0 text-white px-2 pb-1 pt-4 bg-gradient-to-t from-black to-transparent rounded-b text-sm text-ellipsis overflow-hidden whitespace-nowrap"
    >
      {{ photo.title }}
    </h3>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { Photo } from "@/types/photo";

defineProps<{
  photo: Photo;
}>();
</script>
