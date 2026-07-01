import GlowHorizonFM from "../ui/glow-horizon";
import { AnimatedTitleFM } from "../ui/glow-horizon-utils/animated-title-fm";

export default function GlowHorizonDemo() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden", background: "#050507" }}>
      <GlowHorizonFM variant="top" />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <AnimatedTitleFM open={true} />
      </div>
    </div>
  );
}
