import React, { useMemo } from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Point = { x: number; y: number; t: number; click?: boolean };

type AnimatedCursorProps = {
  path: Point[];
  visibleFrom?: number;
  visibleTo?: number;
};

/**
 * PUBLIC_INTERFACE
 * AnimatedCursor
 * Moves along a timed path and shows click pulses at designated points.
 */
export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  path,
  visibleFrom = 0,
  visibleTo = Number.MAX_SAFE_INTEGER,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig(); // ensures we react to config changes without unused vars

  const times = useMemo(() => path.map((p) => p.t), [path]);

  const progress = interpolate(
    frame,
    [visibleFrom, visibleTo],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const segCount = Math.max(1, path.length - 1);
  const curT = interpolate(progress, [0, 1], [times[0], times[times.length - 1]]);

  // find current segment
  let segIndex = 0;
  for (let i = 0; i < segCount; i++) {
    if (curT >= times[i] && curT <= times[i + 1]) {
      segIndex = i;
      break;
    }
  }
  const a = path[segIndex];
  const b = path[segIndex + 1] ?? a;
  const localProg = (curT - a.t) / Math.max(0.0001, b.t - a.t);
  const eased = Easing.inOut(Easing.cubic)(Math.min(1, Math.max(0, localProg)));

  const x = a.x + (b.x - a.x) * eased;
  const y = a.y + (b.y - a.y) * eased;

  const clickNow = a.click && localProg < 0.15;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 18,
        height: 18,
        background: '#fff',
        border: '2px solid #111827',
        borderRadius: 999,
        boxShadow: '0 2px 8px rgba(17,24,39,0.2)',
        transform: 'translate(-9px, -9px)',
      }}
    >
      {clickNow ? (
        <div
          style={{
            position: 'absolute',
            left: -10,
            top: -10,
            width: 38,
            height: 38,
            borderRadius: 999,
            border: '2px solid rgba(37,99,235,0.6)',
            transform: 'scale(1)',
          }}
        />
      ) : null}
    </div>
  );
};
