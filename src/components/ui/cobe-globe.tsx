"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface Marker {
  id: string;
  location: [number, number];
  label?: string;
  size?: number;
}

interface Arc {
  id: string;
  from: [number, number];
  to: [number, number];
  label?: string;
  color?: [number, number, number];
}

interface GlobeProps {
  markers?: Marker[];
  arcs?: Arc[];
  markerColor?: [number, number, number];
  baseColor?: [number, number, number];
  arcColor?: [number, number, number];
  glowColor?: [number, number, number];
  dark?: number;
  mapBrightness?: number;
  markerSize?: number;
  markerElevation?: number;
  className?: string;
}

export function Globe({
  markers = [],
  arcs = [],
  markerColor = [0.3, 0.45, 0.85],
  baseColor = [1, 1, 1],
  arcColor = [0.3, 0.45, 0.85],
  glowColor = [0.94, 0.93, 0.91],
  dark = 0,
  mapBrightness = 6,
  markerSize = 0.03,
  markerElevation = 0.02,
  className = "",
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusPointRef = useRef<[number, number]>([0, 0]);
  const locationToAngles = (lat: number, lng: number): [number, number] => {
    return [
      Math.PI - ((lng * Math.PI) / 180),
      (lat * Math.PI) / 180,
    ];
  };

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let currentGlobe: any = null;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        recreateGlobe();
      }
    };

    const recreateGlobe = () => {
      if (currentGlobe) {
        currentGlobe.destroy();
      }

      if (!canvasRef.current) return;

      currentGlobe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markers: markers.map((m) => ({
          location: m.location,
          size: m.size ?? markerSize,
        })),
        arcs: arcs.map((a) => ({
          from: a.from,
          to: a.to,
          color: a.color ?? arcColor,
        })),
        markerElevation,
        onRender: (state) => {
          state.phi = phi;
          phi += 0.005;
        },
      } as any);
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      if (currentGlobe) {
        currentGlobe.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [
    markers,
    arcs,
    markerColor,
    baseColor,
    arcColor,
    glowColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
  ]);

  return (
    <div className={`w-full aspect-square flex items-center justify-center relative ${className}`}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: "1",
        }}
      />
    </div>
  );
}
