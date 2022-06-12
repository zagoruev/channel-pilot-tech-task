import { reactive, onMounted, onUnmounted, unref, type Ref } from "vue";

export interface TargetSize {
  width: undefined | number;
  height: undefined | number;
}

export function useSize(target: Ref): TargetSize {
  const size = reactive<TargetSize>({
    width: undefined,
    height: undefined,
  });

  onMounted(() => {
    const targetElement = unref(target);
    if (!targetElement) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        Object.assign(size, {
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });

    resizeObserver.observe(targetElement as HTMLElement);

    onUnmounted(() => resizeObserver.disconnect());
  });

  return size;
}
