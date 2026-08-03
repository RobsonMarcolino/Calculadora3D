import { useProgress } from "@react-three/drei";
import { COLORS, MONO } from "../calculator/tokens";

/**
 * Animated loading overlay shown while the GLB model downloads.
 * Uses drei's useProgress to show actual loading percentage.
 * Fades out automatically once loading completes.
 */
export function LoadingScreen() {
  const { progress, active } = useProgress();

  if (!active && progress >= 100) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        background: `radial-gradient(120% 120% at 50% 0%, ${COLORS.bgBottom} 0%, ${COLORS.bgTop} 70%)`,
        fontFamily: MONO,
        transition: "opacity 0.6s ease-out",
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      {/* Pulsing logo silhouette */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.teal} 0%, ${COLORS.knob} 70%)`,
          boxShadow: `0 0 30px ${COLORS.teal}44, 0 0 60px ${COLORS.teal}22`,
          animation: "pulse-glow 1.8s ease-in-out infinite",
        }}
      />

      {/* Title */}
      <span
        style={{
          color: COLORS.teal,
          fontSize: 14,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Calculadora 3D
      </span>

      {/* Progress bar */}
      <div
        style={{
          width: 200,
          height: 3,
          borderRadius: 2,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: 2,
            background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.orangeHot})`,
            transition: "width 0.3s ease-out",
            boxShadow: `0 0 8px ${COLORS.orangeHot}88`,
          }}
        />
      </div>

      {/* Percentage */}
      <span
        style={{
          color: "rgba(214, 205, 184, 0.5)",
          fontSize: 11,
          letterSpacing: "0.15em",
        }}
      >
        {Math.round(progress)}%
      </span>

      {/* CSS animation for the pulsing logo */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.12); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
