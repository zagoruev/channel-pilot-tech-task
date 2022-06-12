export const bezierWeight = 1;

export interface BezierPoint {
  x: number;
  y: number;
}

export function getBezierPathData(from: BezierPoint, to: BezierPoint): string {
  const dx = Math.abs(from.x - to.x) * bezierWeight;

  const c1 = {
    x: from.x - dx,
    y: from.y,
  };

  const c2 = {
    x: to.x + dx,
    y: to.y,
  };

  return `M${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
}
