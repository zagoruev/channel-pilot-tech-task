<template>
  <div
    class="connectror w-4 h-4 rounded-full border absolute bg-cyan-500 cursor-pointer bottom-1/2 translate-x-1/2 translate-y-1/2 border-white hover:scale-150 transition-all duration-200"
    :class="position === 'left' ? 'right-full' : 'right-0'"
  ></div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    position?: "left" | "right";
  }>(),
  {
    position: "left",
  }
);
</script>
