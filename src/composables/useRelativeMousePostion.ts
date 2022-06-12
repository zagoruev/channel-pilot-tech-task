import { reactive, onMounted, onUnmounted, type Ref, unref } from "vue";

export interface TargetMousePosition {
  x: undefined | number;
  y: undefined | number;
}

export function useRelativeMousePosition(target: Ref): TargetMousePosition {
  const position = reactive<TargetMousePosition>({
    x: undefined,
    y: undefined,
  });

  function update(e: MouseEvent, target: HTMLElement) {
    Object.assign(position, {
      x: e.pageX - target.offsetLeft,
      y: e.pageY - target.offsetTop,
    });
  }

  onMounted(() => {
    const targetElement = unref(target);
    if (!targetElement) {
      return;
    }

    const targetEvent = (e: MouseEvent) => {
      return update(e, targetElement);
    };

    targetElement.addEventListener("mousemove", targetEvent);

    onUnmounted(() =>
      targetElement.removeEventListener("mousemove", targetEvent)
    );
  });

  return position;
}
