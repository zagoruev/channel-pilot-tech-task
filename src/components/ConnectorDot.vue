<template>
  <div
    class="connectror w-4 h-4 rounded-full border absolute bg-cyan-500 cursor-pointer bottom-1/2 translate-x-1/2 translate-y-1/2 border-white hover:scale-150 transition-all duration-200"
    :class="position === 'left' ? 'right-full' : 'right-0'"
    ref="el"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import type { ConnectorDotComponent } from "@/types/connector-dot-component";

const el = ref(null);

const props = withDefaults(
  defineProps<{
    position?: "left" | "right";
    id: number;
  }>(),
  {
    position: "left",
  }
);
defineExpose<ConnectorDotComponent>({
  id: props.id,
  el,
});
</script>
