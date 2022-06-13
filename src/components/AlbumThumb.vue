<template>
  <div
    class="bg-white shadow rounded p-3 mt-3 border border-white relative select-none"
  >
    <p class="text-gray-700 font-semibold tracking-wide text-sm m-0">
      {{ album.title }}
    </p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { Album } from "@/types/album";

defineProps<{
  album: Album;
}>();
</script>
