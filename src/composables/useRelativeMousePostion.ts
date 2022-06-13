import { reactive, onMounted, onUnmounted, type Ref, unref } from "vue";
import type { Coords } from "@/types/coords";

export function useRelativeMousePosition(target: Ref): Coords {
  const position = reactive<Coords>({
    x: 0,
    y: 0,
  });

  function update(e: MouseEvent, target: HTMLElement) {
    const targetRect = target.getBoundingClientRect();

    Object.assign(position, {
      x: e.clientX - targetRect.left,
      y: e.clientY - targetRect.top,
    });
  }

  onMounted(() => {
    const targetElement = unref(target);
    if (!targetElement) {
      return;
    }

    const targetEventHandler = (e: MouseEvent) => {
      return update(e, targetElement);
    };

    targetElement.addEventListener("mousemove", targetEventHandler);

    onUnmounted(() =>
      targetElement.removeEventListener("mousemove", targetEventHandler)
    );
  });

  return position;
}
