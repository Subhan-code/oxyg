import React, { useState, useMemo, useRef, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Loader } from "@react-three/drei";
import { useLenis } from "lenis/react";
import * as THREE from "three";

// Utilities
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// 24 image assets copied to public/images/
const IMAGE_LIST: string[] = Array.from({ length: 24 }, (_, i) => `/images/img${i + 1}.webp`);

// Shaders
const VERTEX_SHADER_VERTICAL = `
uniform float uScrollSpeed;
uniform float uCurveStrength;
uniform float uCurveFrequency;

varying vec2 vUv;

#define PI 3.141592653

void main() {
  vec3 pos = position;
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  // X Displacement depending on the world position Y
  float xDisplacement = uCurveStrength * cos(worldPosition.y * uCurveFrequency);
  pos.x += xDisplacement;
  pos.x -= uCurveStrength;

  // Y Displacement according to the scroll speed
  float yDisplacement = -sin(uv.x * PI) * uScrollSpeed;
  pos.y += yDisplacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

  // VARYINGS
  vUv = uv;
}
`;

const VERTEX_SHADER_HORIZONTAL = `
uniform float uScrollSpeed;
uniform float uCurveStrength;
uniform float uCurveFrequency;

varying vec2 vUv;

#define PI 3.141592653

void main() {
  vec3 pos = position;
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  // Y Displacement depending on the world position X
  float yDisplacement = uCurveStrength * cos(worldPosition.x * uCurveFrequency);
  pos.y += yDisplacement;
  pos.y -= uCurveStrength;

  // X Displacement according to the scroll speed
  float xDisplacement = -sin(uv.y * PI) * uScrollSpeed;
  pos.x += xDisplacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

  // VARYINGS
  vUv = uv;
}
`;

const FRAGMENT_SHADER_COVER = `
precision highp float;

uniform sampler2D uTexture;
uniform vec2 uPlaneSizes;
uniform vec2 uImageSizes;

varying vec2 vUv;

void main() {
  // Calculate the proper UVs to cover the plane with the image while keeping its aspect ratio
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec4 finalColor = texture2D(uTexture, uv);
  
  gl_FragColor = finalColor;
}
`;

interface GLImageProps {
  imageUrl: string;
  scale: [number, number, number];
  position?: [number, number, number];
  curveStrength?: number;
  curveFrequency?: number;
  geometry: THREE.PlaneGeometry;
  direction?: "vertical" | "horizontal";
}

const GLImage = forwardRef<THREE.Mesh, GLImageProps>(
  (
    {
      imageUrl,
      scale,
      position = [0, 0, 0],
      curveStrength = 0,
      curveFrequency = 0,
      geometry,
      direction = "vertical",
    },
    forwardedRef
  ) => {
    const localRef = useRef<THREE.Mesh>(null);
    const imageRef = forwardedRef || localRef;
    
    let texture: THREE.Texture;
    try {
      texture = useTexture(imageUrl);
    } catch (e) {
      // Fallback loader if texture assets are not fully initialized yet
      texture = new THREE.Texture();
    }

    const imageSizes = useMemo(() => {
      if (!texture || !texture.image) return [512, 512];
      return [(texture.image as any).width, (texture.image as any).height];
    }, [texture]);

    const shaderArgs = useMemo(
      () => ({
        uniforms: {
          uTexture: { value: texture },
          uScrollSpeed: { value: 0.0 },
          uPlaneSizes: { value: new THREE.Vector2(scale[0], scale[1]) },
          uImageSizes: {
            value: new THREE.Vector2(imageSizes[0], imageSizes[1]),
          },
          uCurveStrength: { value: curveStrength },
          uCurveFrequency: { value: curveFrequency },
        },
        vertexShader: direction === "vertical" ? VERTEX_SHADER_VERTICAL : VERTEX_SHADER_HORIZONTAL,
        fragmentShader: FRAGMENT_SHADER_COVER,
      }),
      [texture, direction, curveStrength, curveFrequency, scale, imageSizes]
    );

    return (
      <mesh position={position} ref={imageRef} scale={scale}>
        <primitive object={geometry} attach="geometry" />
        <shaderMaterial {...shaderArgs} />
      </mesh>
    );
  }
);

GLImage.displayName = "GLImage";

interface CarouselProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  imageSize: [number, number];
  gap: number;
  wheelFactor?: number;
  wheelDirection?: 1 | -1;
  curveStrength?: number;
  curveFrequency?: number;
  direction?: "vertical" | "horizontal";
}

const Carousel = ({
  position,
  rotation,
  imageSize,
  gap,
  wheelFactor = 1,
  wheelDirection = 1,
  curveStrength = 0,
  curveFrequency = 0,
  direction = "vertical",
}: CarouselProps) => {
  const imageRefs = useRef<THREE.Mesh[]>([]);

  const planeGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(1, 1, 16, 16);
  }, []);

  const totalHeight = IMAGE_LIST.length * gap + IMAGE_LIST.length * imageSize[1];
  const totalWidth = IMAGE_LIST.length * gap + IMAGE_LIST.length * imageSize[0];

  useFrame(() => {
    if (direction === "vertical") {
      imageRefs.current.forEach((ref) => {
        if (!ref) return;
        ref.position.y = mod(ref.position.y + totalHeight / 2, totalHeight) - totalHeight / 2;
      });
    } else {
      imageRefs.current.forEach((ref) => {
        if (!ref) return;
        ref.position.x = mod(ref.position.x + totalWidth / 2, totalWidth) - totalWidth / 2;
      });
    }
  });

  useLenis(({ velocity }) => {
    if (direction === "vertical") {
      imageRefs.current.forEach((ref) => {
        if (ref) {
          ref.position.y -= velocity * 0.005 * wheelFactor * wheelDirection;
          // @ts-expect-error ignore
          if (ref.material && ref.material.uniforms) {
            // @ts-expect-error ignore
            ref.material.uniforms.uScrollSpeed.value = velocity * 0.005 * wheelFactor * wheelDirection;
          }
        }
      });
    } else {
      imageRefs.current.forEach((ref) => {
        if (ref) {
          ref.position.x += velocity * 0.005 * wheelFactor * wheelDirection;
          // @ts-expect-error ignore
          if (ref.material && ref.material.uniforms) {
            // @ts-expect-error ignore
            ref.material.uniforms.uScrollSpeed.value = -velocity * 0.005 * wheelFactor * wheelDirection;
          }
        }
      });
    }
  });

  return (
    <group position={position || [0, 0, 0]} rotation={rotation || [0, 0, 0]}>
      {IMAGE_LIST.map((url, index) => (
        <GLImage
          key={index}
          imageUrl={url}
          scale={[imageSize[0], imageSize[1], 1]}
          geometry={planeGeometry}
          curveStrength={curveStrength}
          curveFrequency={curveFrequency}
          position={
            direction === "vertical"
              ? [0, index * (imageSize[1] + gap), 0]
              : [index * (imageSize[0] + gap), 0, 0]
          }
          ref={(el) => {
            if (el) imageRefs.current[index] = el;
          }}
          direction={direction}
        />
      ))}
    </group>
  );
};

export default function R3FExperimentalCarousel() {
  const [activeExperiment, setActiveExperiment] = useState(1);

  return (
    <div className="relative w-full h-[450px] bg-[#0c0c0e] text-white overflow-hidden rounded-2xl border border-white/5 flex flex-col justify-between p-6 select-none font-sans">
      
      {/* Experiment Toggle Menu */}
      <div className="w-full max-w-lg z-30 flex flex-col gap-2">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setActiveExperiment(num)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-tight whitespace-nowrap transition-all border cursor-pointer ${
                activeExperiment === num
                  ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              Experiment {num}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-gray-500 text-left px-1">
          {activeExperiment === 1 && "Vertical Triple Column: Opposing scroll directions with curves."}
          {activeExperiment === 2 && "Bold Scale Columns: Slim, highly curved columns surrounding a flat center column."}
          {activeExperiment === 3 && "Slight Diagonal Tilt: Triple column tilted slightly on the diagonal axis."}
          {activeExperiment === 4 && "Compound Multi-Layer: Nested carousels with offsets rotating under varying frequencies."}
          {activeExperiment === 5 && "Horizontal Triple Row: Rows scrolling horizontally with vertical waving."}
          {activeExperiment === 6 && "Diagonal X-Pattern: Multi-carousel groups rotated in 45-degree layouts."}
        </p>
      </div>

      {/* R3F Canvas */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <Canvas
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          camera={{ position: [0, 0, 3], fov: 75 }}
        >
          <React.Suspense fallback={null}>
            {activeExperiment === 1 && (
              <>
                <Carousel imageSize={[1, 1]} gap={0.05} curveFrequency={0.4} curveStrength={1} wheelFactor={0.4} />
                <Carousel
                  position={[1.1, 0, 0]}
                  imageSize={[1, 1]}
                  gap={0.05}
                  curveFrequency={0.4}
                  curveStrength={1}
                  wheelFactor={0.5}
                  wheelDirection={-1}
                />
                <Carousel
                  position={[-1.1, 0, 0]}
                  imageSize={[1, 1]}
                  gap={0.05}
                  curveFrequency={0.4}
                  curveStrength={1}
                  wheelFactor={0.3}
                  wheelDirection={-1}
                />
              </>
            )}

            {activeExperiment === 2 && (
              <>
                <Carousel
                  imageSize={[1.8, 0.6]}
                  gap={0.1}
                  position={[2.5, 0, 0]}
                  curveFrequency={0.3}
                  curveStrength={-1.2}
                  wheelFactor={0.5}
                  wheelDirection={-1}
                />
                <Carousel
                  imageSize={[1.8, 0.6]}
                  gap={0.1}
                  position={[-2.5, 0, 0]}
                  curveFrequency={0.3}
                  curveStrength={1.2}
                  wheelFactor={0.5}
                  wheelDirection={-1}
                />
                <Carousel
                  imageSize={[1.6, 1]}
                  gap={0.1}
                  position={[0, 0, 0]}
                  curveFrequency={0}
                  curveStrength={0}
                  wheelFactor={0.25}
                  wheelDirection={1}
                />
              </>
            )}

            {activeExperiment === 3 && (
              <group rotation={[0, 0, Math.PI / 5]}>
                <Carousel
                  imageSize={[0.8, 1]}
                  gap={0}
                  wheelFactor={0.2}
                  position={[-1.2, 0, 0]}
                  curveFrequency={0.4}
                  curveStrength={0.9}
                />
                <Carousel
                  imageSize={[0.8, 1]}
                  gap={0}
                  wheelFactor={0.3}
                  position={[-0.6, 0, 0]}
                  curveFrequency={0.4}
                  curveStrength={0.6}
                />
                <Carousel imageSize={[0.8, 1]} gap={0} wheelFactor={0.4} />
                <Carousel
                  imageSize={[0.8, 1]}
                  gap={0}
                  wheelFactor={0.5}
                  position={[0.6, 0, 0]}
                  curveFrequency={0.4}
                  curveStrength={-0.6}
                />
                <Carousel
                  imageSize={[0.8, 1]}
                  gap={0}
                  wheelFactor={0.6}
                  position={[1.2, 0, 0]}
                  curveFrequency={0.4}
                  curveStrength={-0.9}
                />
              </group>
            )}

            {activeExperiment === 4 && (
              <>
                <Carousel imageSize={[0.3, 0.4]} gap={0} wheelFactor={0.4} position={[0, 0, 0]} curveFrequency={0.5} curveStrength={-1} />
                <Carousel
                  imageSize={[0.3, 0.4]}
                  gap={0}
                  wheelFactor={0.3}
                  position={[0, 0, 0]}
                  rotation={[0, 0, Math.PI / 5]}
                  curveStrength={1}
                  curveFrequency={0.5}
                />
                <Carousel
                  imageSize={[0.3, 0.4]}
                  gap={0}
                  wheelFactor={0.2}
                  position={[2, 0, 0]}
                  rotation={[0, 0, -Math.PI / 6]}
                  curveStrength={1.4}
                  curveFrequency={0.5}
                />
                <Carousel
                  imageSize={[0.3, 0.4]}
                  gap={0}
                  wheelFactor={0.5}
                  position={[-2, 0, 0]}
                  rotation={[0, 0, -Math.PI / 8]}
                  curveStrength={1.4}
                  curveFrequency={0.5}
                />
                <Carousel
                  imageSize={[0.3, 0.4]}
                  gap={0}
                  wheelFactor={0.35}
                  position={[2, 0, 0]}
                  rotation={[0, 0, Math.PI / 8]}
                  curveStrength={-1.8}
                  curveFrequency={0.3}
                />
                <Carousel
                  imageSize={[0.3, 0.4]}
                  gap={0}
                  wheelFactor={0.45}
                  position={[-1.7, 0, 0]}
                  rotation={[0, 0, Math.PI / 9]}
                  curveStrength={-1.8}
                  curveFrequency={0.3}
                />
              </>
            )}

            {activeExperiment === 5 && (
              <group position={[0, 0.4, 0]}>
                <Carousel
                  position={[0, -0.8, 0]}
                  imageSize={[1, 1]}
                  gap={0}
                  wheelFactor={0.4}
                  direction="horizontal"
                  curveFrequency={0.9}
                  curveStrength={0.5}
                />
                <Carousel
                  position={[0, 0, 0]}
                  imageSize={[1, 1]}
                  gap={0}
                  wheelFactor={0.3}
                  direction="horizontal"
                  curveFrequency={1}
                  curveStrength={0.4}
                />
                <Carousel
                  position={[0, 0.8, 0]}
                  imageSize={[1, 1]}
                  gap={0}
                  wheelFactor={0.2}
                  direction="horizontal"
                  curveFrequency={1.1}
                  curveStrength={0.3}
                />
              </group>
            )}

            {activeExperiment === 6 && (
              <>
                <group rotation={[0, 0, Math.PI / 4]}>
                  <Carousel
                    imageSize={[2, 1.1]}
                    gap={0.05}
                    position={[-1.3, 0, 0]}
                    curveFrequency={0.4}
                    curveStrength={1.2}
                    wheelFactor={0.1}
                    wheelDirection={1}
                  />
                  <Carousel
                    imageSize={[0.3, 0.4]}
                    gap={0}
                    wheelFactor={0.2}
                    position={[-2.3, 0, 0]}
                    curveFrequency={0.4}
                    curveStrength={7.5}
                    wheelDirection={-1}
                  />
                  <Carousel
                    imageSize={[0.3, 0.4]}
                    gap={0}
                    wheelFactor={0.2}
                    position={[-0.4, 0, 0]}
                    curveFrequency={0.4}
                    curveStrength={7.5}
                    wheelDirection={-1}
                  />
                </group>

                <group rotation={[0, 0, Math.PI / 4]}>
                  <Carousel
                    imageSize={[2, 1.1]}
                    gap={0.05}
                    position={[1.3, 0, 0]}
                    curveFrequency={0.4}
                    curveStrength={-1.2}
                    wheelFactor={0.1}
                    wheelDirection={-1}
                  />
                  <Carousel
                    imageSize={[0.3, 0.4]}
                    gap={0}
                    wheelFactor={0.2}
                    position={[2.3, 0, 0]}
                    curveFrequency={0.4}
                    curveStrength={-7.5}
                    wheelDirection={1}
                  />
                  <Carousel
                    imageSize={[0.3, 0.4]}
                    gap={0}
                    wheelFactor={0.2}
                    position={[0.4, 0, 0]}
                    curveFrequency={0.4}
                    curveStrength={-7.5}
                    wheelDirection={1}
                  />
                </group>
              </>
            )}
          </React.Suspense>
        </Canvas>
      </div>

      {/* Floating Info */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/50 border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest text-white/80 uppercase backdrop-blur-sm">
        Scroll Page or Use Swipe Gestures to Move Carousel
      </div>
    </div>
  );
}
