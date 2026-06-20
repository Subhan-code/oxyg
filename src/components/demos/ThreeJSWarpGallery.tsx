import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

const MEDIAS = [
  { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop", name: "Morning Ascent", location: "Northern Range", date: "June 12, 1972" },
  { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&auto=format&fit=crop", name: "Camp at Dusk", location: "Base Camp", date: "September 4, 1974" },
  { url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop", name: "Crossing the Valley", location: "Interior Highlands", date: "July 19, 1971" },
  { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop", name: "Quiet Plateau", location: "High Ridge", date: "May 3, 1976" },
  { url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=600&auto=format&fit=crop", name: "Rest Stop", location: "Rocky Pass", date: "August 22, 1973" },
  { url: "https://images.unsplash.com/photo-1472214222555-d404758b1c42?q=80&w=600&auto=format&fit=crop", name: "Evening Descent", location: "Southern Slope", date: "September 15, 1975" },
  { url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop", name: "Along the Ridge", location: "Upper Trail", date: "June 28, 1977" },
  { url: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?q=80&w=600&auto=format&fit=crop", name: "Shelter from the Wind", location: "Expedition Route", date: "July 9, 1970" },
  { url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop", name: "Last Light", location: "Far Horizon", date: "August 31, 1978" }
];

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
uniform sampler2D uTexture;
varying vec2 vUv;

uniform vec2 uResolution;
uniform float uProgress;
uniform vec3 uColor;

uniform vec2 uContainerRes;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 squaresGrid(vec2 vUv) {
  float imageAspectX = 1.0;
  float imageAspectY = 1.0;

  float containerAspectX = uResolution.x / uResolution.y;
  float containerAspectY = uResolution.y / uResolution.x;

  vec2 ratio = vec2(
    min(containerAspectX / imageAspectX, 1.0),
    min(containerAspectY / imageAspectY, 1.0)
  );

  vec2 squareUvs = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  return squareUvs;
}

void main() {
  float imageAspectX = uResolution.x / uResolution.y;
  float imageAspectY = uResolution.y / uResolution.x;
  
  float containerAspectX = uContainerRes.x / uContainerRes.y;
  float containerAspectY = uContainerRes.y / uContainerRes.x;

  vec2 ratio = vec2(
    min(containerAspectX / imageAspectX, 1.0),
    min(containerAspectY / imageAspectY, 1.0)
  );

  vec2 coverUvs = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  // Generate grid
  vec2 squareUvs = squaresGrid(coverUvs);
  float gridSize = floor(uContainerRes.x / 20.0);
  vec2 grid = vec2(floor(squareUvs.x * gridSize) / gridSize, floor(squareUvs.y * gridSize) / gridSize);
  vec4 gridTexture = vec4(uColor, 0.0);

  // Image texture    
  vec4 texture = texture2D(uTexture, coverUvs);
  float height = 0.2;

  float progress = (1.0 + height) - (uProgress * (1.0 + height + height)); // Goes from 1+height to -height

  float dist = 1.0 - distance(grid.y, progress);
  float clampedDist = smoothstep(height, 0.0, distance(grid.y, progress));

  float randDist = step(1.0 - height * random(grid), dist);
  dist = step(1.0 - height, dist);
  
  float rand = random(grid); 

  float alpha = dist * (clampedDist + rand - 0.5 * (1.0 - randDist));
  alpha = max(0.0, alpha);
  gridTexture.a = alpha;

  texture.rgba *= step(progress, grid.y);
  
  gl_FragColor = vec4(mix(texture, gridTexture, gridTexture.a));
}
`;

export default function ThreeJSWarpGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const canvas = canvasRef.current;
    if (!container || !scrollContainer || !canvas) return;

    // Set layout size constants
    const clientW = container.clientWidth;
    const clientH = container.clientHeight;

    // WebGL setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, clientW / clientH, 0.1, 100);
    camera.position.z = 10;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(clientW, clientH);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    // Calculate view size mapping helper
    const getSizes = () => {
      let fov = camera.fov * (Math.PI / 180);
      let height = camera.position.z * Math.tan(fov / 2) * 2;
      let width = height * camera.aspect;
      return { width, height };
    };

    let sizes = getSizes();

    // Media meshes mapping class
    class WebGLMedia {
      element: HTMLImageElement;
      material: THREE.ShaderMaterial;
      geometry: THREE.PlaneGeometry;
      mesh: THREE.Mesh;
      elementBounds: DOMRect;
      nodeWidth = 0;
      nodeHeight = 0;
      meshWidth = 0;
      meshHeight = 0;
      meshX = 0;
      meshY = 0;

      constructor(element: HTMLImageElement) {
        this.element = element;
        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        this.material = new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          uniforms: {
            uTexture: new THREE.Uniform(new THREE.Texture()),
            uResolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
            uContainerRes: new THREE.Uniform(new THREE.Vector2(0, 0)),
            uProgress: new THREE.Uniform(0),
            uColor: new THREE.Uniform(new THREE.Color("#16161a")),
          },
          transparent: true
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.mesh);

        this.updateBounds();
        this.loadTexture();
      }

      updateBounds() {
        const bounds = this.element.getBoundingClientRect();
        const containerBounds = container!.getBoundingClientRect();

        // Calculate position relative to container
        const left = bounds.left - containerBounds.left;
        const top = bounds.top - containerBounds.top + scrollContainer!.scrollTop;

        this.nodeWidth = bounds.width;
        this.nodeHeight = bounds.height;

        this.meshWidth = (this.nodeWidth * sizes.width) / clientW;
        this.meshHeight = (this.nodeHeight * sizes.height) / clientH;

        this.mesh.scale.x = this.meshWidth;
        this.mesh.scale.y = this.meshHeight;

        this.meshX = (left * sizes.width) / clientW - sizes.width / 2 + this.meshWidth / 2;
        this.meshY = -(top * sizes.height) / clientH + sizes.height / 2 - this.meshHeight / 2;

        this.mesh.position.x = this.meshX;
        this.mesh.position.y = this.meshY;
      }

      loadTexture() {
        new THREE.TextureLoader().load(this.element.src, (texture) => {
          this.material.uniforms.uTexture.value = texture;
          this.material.uniforms.uResolution.value = new THREE.Vector2(
            texture.image.naturalWidth,
            texture.image.naturalHeight
          );
          this.material.uniforms.uContainerRes.value = new THREE.Vector2(
            this.nodeWidth,
            this.nodeHeight
          );
        });
      }

      updateScroll(scrollY: number) {
        // Offset Y based on local scroll position
        const scrollYSize = (scrollY * sizes.height) / clientH;
        this.mesh.position.y = this.meshY + scrollYSize;

        // Viewport trigger progress animation
        const elementTop = this.element.offsetTop;
        const elementHeight = this.element.clientHeight;
        const containerHeight = scrollContainer!.clientHeight;

        const viewportProgress = (scrollY + containerHeight - elementTop) / (containerHeight + elementHeight);
        const clamped = Math.max(0, Math.min(1, viewportProgress));

        // Map scroll range to progress uniform transition
        this.material.uniforms.uProgress.value = clamped;
      }

      destroy() {
        scene.remove(this.mesh);
        this.geometry.dispose();
        this.material.dispose();
      }
    }

    // Set image elements mapping
    const imageNodes = scrollContainer.querySelectorAll(".grid__item img");
    const webglMedias: WebGLMedia[] = [];

    // Trigger texture loading after render loop starts
    setTimeout(() => {
      imageNodes.forEach((node) => {
        webglMedias.push(new WebGLMedia(node as HTMLImageElement));
      });
    }, 100);

    // Render ticking loop
    let reqId: number;
    const render = () => {
      webglMedias.forEach((media) => {
        media.updateScroll(scrollContainer.scrollTop);
      });
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(render);
    };
    reqId = requestAnimationFrame(render);

    // Handle container resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      sizes = getSizes();
      renderer.setSize(w, h);

      webglMedias.forEach((media) => {
        media.updateBounds();
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      webglMedias.forEach((m) => m.destroy());
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[450px] bg-[#16161a] text-white overflow-hidden rounded-2xl border border-white/5 flex">
      {/* ThreeJS WebGL overlay canvas container */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full pointer-events-none opacity-80" />

      {/* Internal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-y-auto z-20 px-8 py-10 relative flex flex-col items-center no-scrollbar select-none"
      >
        <header className="w-full max-w-xl text-left border-b border-white/10 pb-6 mb-10 shrink-0">
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block mb-1">Three.js WebGL Sandbox</span>
          <h3 className="text-3xl font-serif font-bold text-white tracking-tight leading-tight">Northern Expeditions 1970</h3>
        </header>

        {/* Gallery Image Grid */}
        <div className="w-full max-w-xl grid grid-cols-12 gap-y-16 gap-x-6 relative">
          {MEDIAS.map((media, i) => {
            // Recreate varying size columns mimicking Astro project layouts
            const row = Math.floor(i / 2) + 1;
            const isLeft = i % 2 === 0;
            const startCol = isLeft ? 1 : 7;
            const size = isLeft ? 5 : 5;

            return (
              <div 
                key={i} 
                style={{
                  gridColumnStart: startCol,
                  gridColumnEnd: startCol + size,
                }}
                className="grid__item flex flex-col gap-2.5 relative group"
              >
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 relative">
                  {/* Invisible source image parsed by ThreeJS texture mapping bounds */}
                  <img 
                    src={media.url} 
                    alt={media.name} 
                    className="w-full h-full object-cover opacity-0 pointer-events-none" 
                  />
                  <div className="absolute inset-0 z-30 bg-black/10 border border-white/5 rounded-xl pointer-events-none" />
                </div>
                <div className="flex flex-col text-left px-1.5">
                  <span className="text-[12px] font-bold text-white/90 leading-tight">{media.name}</span>
                  <span className="text-[10px] text-gray-500 font-bold tracking-tight mt-0.5">{media.location} • {media.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        <footer className="w-full max-w-xl text-center border-t border-white/10 pt-10 mt-16 text-gray-500 text-[11px] font-bold shrink-0">
          Scroll up or down to experience WebGL grid-pixelation transitions.
        </footer>
      </div>
    </div>
  );
}
