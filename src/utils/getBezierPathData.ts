export const bezierWeight = 0.675;

import type { Coords } from "@/types/coords";

export function getBezierPathData(from: Coords, to: Coords): string {
  const dx = Math.abs(from.x - to.x) * bezierWeight;
  const ltr = from.x < to.x;

  const c1 = {
    x: from.x - (ltr ? -dx : dx),
    y: from.y,
  };

  const c2 = {
    x: to.x + (ltr ? -dx : dx),
    y: to.y,
  };

  return `M${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
}
