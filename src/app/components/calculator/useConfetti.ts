import confetti from "canvas-confetti";
import { COLORS } from "./tokens";

/**
 * Fires a confetti burst themed to the LBK-12C palette.
 * Called after the pricing result is revealed on the display.
 */
export function fireConfetti(): void {
  const defaults = {
    spread: 70,
    ticks: 120,
    gravity: 0.95,
    decay: 0.92,
    startVelocity: 30,
    colors: [COLORS.orangeHot, COLORS.orange, COLORS.teal, "#d4c9a8", "#ffd23a"],
  };

  // Two bursts from either side for a symmetrical celebration
  confetti({
    ...defaults,
    particleCount: 45,
    origin: { x: 0.3, y: 0.65 },
    angle: 60,
  });

  confetti({
    ...defaults,
    particleCount: 45,
    origin: { x: 0.7, y: 0.65 },
    angle: 120,
  });
}
