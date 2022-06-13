<template>
  <div class="absolute inset-0" ref="ruler">
    <v-stage :config="canvasConfig">
      <v-layer>
        <v-path
          v-if="connectorData"
          :data="connectorData"
          :strokeWidth="2"
          stroke="rgb(6 182 212)"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Coords } from "@/types/coords";
import { getBezierPathData } from "@/utils/getBezierPathData";
import { useSize } from "@/composables/useSize";

const props = defineProps<{
  start: Coords | null;
  mouse: Coords;
}>();

const ruler = ref(null);
const containerSize = useSize(ruler);

const canvasConfig = computed(() => {
  return containerSize;
});

const connectorData = computed(() => {
  if (props.start) {
    return getBezierPathData(props.start, props.mouse);
  }
  return false;
});
</script>
