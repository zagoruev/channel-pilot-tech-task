<template>
  <div class="bg-gray-50 py-4 px-6 rounded mr-4 column">
    <h2 class="text-gray-700 font-semibold tracking-wide text-sm">
      {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
