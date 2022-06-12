export interface TargetPosition {
  x: undefined | number;
  y: undefined | number;
}

export function getRelativeCenterPosition(
  target: HTMLElement,
  parent: HTMLElement
): TargetPosition {
  const targetRect = target.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  return {
    x: targetRect.left - parentRect.left + targetRect.width / 2,
    y: targetRect.top - parentRect.top + targetRect.height / 2,
  };
}
