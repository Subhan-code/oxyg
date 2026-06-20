import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

const VERTEX_SHADER = `
varying vec2 vUv;

attribute vec3 aPosition;
attribute float aIndex;
attribute vec4 aTextureCoords;

uniform float uCurrentPage;
uniform float uPageThickness;
uniform float uPageWidth;
uniform float uPageHeight;
uniform float uMeshCount;
uniform float uTime;
uniform float uProgress;
uniform float uSplitProgress;
uniform float uPageSpacing;

uniform float uScrollY;
uniform float uMaxX;
uniform float uSpeedY;

varying vec4 vTextureCoords;
varying float vIndex;
varying float vRotationProgress;
varying vec3 vPosition;

mat3 getYrotationMatrix(float angle) {
    return mat3(
        cos(angle), 0.0, sin(angle),
        0.0, 1.0, 0.0,
        -sin(angle), 0.0, cos(angle)
    );
}

mat3 getXrotationMatrix(float angle) {
    return mat3(
        1.0, 0.0, 0.0,
        0.0, cos(angle), -sin(angle),
        0.0, sin(angle), cos(angle)
    );
}

float remap(float value, float originMin, float originMax) {
    return clamp((value - originMin) / (originMax - originMin),0.,1.);
}

float getXwave(float x) {
    return sin(x*2.) * 0.4;
}

void main() {     
    float PI = 3.14159265359;

    // Define the rotation center
    vec3 rotationCenter = vec3(-uPageWidth*0.5, 0.0, 0.0);
    
    // Translate position to make rotation center the origin
    vec3 translatedPosition = position - rotationCenter;    
    
    float rotationAcclerationProgress = remap(uProgress,0.,0.3);
    
    float delayBeforeStart = (aIndex / uMeshCount);
    float localRotAccelerationProgress = clamp((rotationAcclerationProgress - delayBeforeStart), 0.0, 1.0);

    float yAngle = -(position.x*0.2*smoothstep(0.,0.3,rotationAcclerationProgress) - rotationAcclerationProgress*2.*PI - localRotAccelerationProgress*2.*PI);

    float fullSpeedRotationAngle = remap(uProgress,0.3,0.7);
    yAngle += fullSpeedRotationAngle*4.2*PI;    

    float stackingAngle = remap(uProgress,0.7,1.);
    
    yAngle += position.x*0.2*stackingAngle + (1.-localRotAccelerationProgress)*2.*PI*stackingAngle + PI*1.7*stackingAngle;

    float pageCrumple = (aIndex - (uMeshCount-1.)*0.5)*smoothstep(0.8,1.,stackingAngle)*((uPageWidth-translatedPosition.x-1.)*0.01);
    
    translatedPosition.z+= pageCrumple*(1.-uSplitProgress);
    
    float pageCrumpleAngle = (aIndex - (uMeshCount-1.)*0.5)*smoothstep(0.8,1.,stackingAngle)*((-pow(translatedPosition.x,2.))*0.002);
    yAngle+= pageCrumpleAngle;

    float stackingPages = (uMeshCount-aIndex) * uPageThickness*smoothstep(0.8,1.,stackingAngle);
    
    translatedPosition.z += stackingPages*(1.-uSplitProgress); // Apply stacking effect along Z-axis

    yAngle-= pageCrumpleAngle*uSplitProgress;

    yAngle-=uSplitProgress*PI*0.4;
    
    translatedPosition.z += uSplitProgress*uPageSpacing*( - (aIndex - (uMeshCount-1.)*0.5));        

    // Z Scroll logic
    float boxCenterZ = uPageSpacing*( - (aIndex - (uMeshCount-1.)*0.5));        
    
    float maxZ = uMeshCount * (uPageSpacing + uPageThickness) * 0.5;

    float centerZProgress = boxCenterZ - uScrollY;
    float wrappedCenterZ = mod(centerZProgress + maxZ, 2.0 * maxZ) - maxZ - getXwave((position.y+uPageHeight*0.5)/uPageHeight)*clamp(uSpeedY*2.,-2.,2.    ); 
    
    float zOffset = wrappedCenterZ - boxCenterZ;
    
    translatedPosition.z += zOffset;
    
    vec3 rotatedPosition = getYrotationMatrix(yAngle) * translatedPosition;        

    rotatedPosition.z-=uSplitProgress;

    float initialRotationProgress = remap(uProgress,0.,0.15);

    // Translate back to original coordinate system
    rotatedPosition += rotationCenter;
    rotatedPosition.x += initialRotationProgress*uPageWidth*0.5; // Adjust X position to align pages correctly        
        
    float xAngle = -PI*0.2*initialRotationProgress;
    xAngle+=uSplitProgress*PI*0.2;
    
    vec3 newPosition = getXrotationMatrix(xAngle) * rotatedPosition;
        
    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(newPosition, 1.0);        

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;    

    vUv = uv;    
    vTextureCoords=aTextureCoords;
    vIndex=aIndex;
    vRotationProgress=localRotAccelerationProgress;
}
`;

const FRAGMENT_SHADER = `
varying vec2 vUv;
varying vec4 vTextureCoords;
uniform sampler2D uAtlas;

varying float vIndex;
varying float vRotationProgress;

void main() {            
    // Get UV coordinates for this image from the uniform array
    float xStart = vTextureCoords.x;
    float xEnd = vTextureCoords.y;
    float yStart = vTextureCoords.z;
    float yEnd = vTextureCoords.w;

    vec2 atlasUV = vec2(
        mix(xStart, xEnd, vUv.x),
        mix(yStart, yEnd, 1.-vUv.y)
    );

    if(vRotationProgress==0. && vIndex!=0.) {
        discard;
    }
    
    // Sample the texture
    vec4 color = texture2D(uAtlas, atlasUV);
    
    gl_FragColor = color;
}
`;

export default function WebGLMagazine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let clientW = container.clientWidth || 640;
    let clientH = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, clientW / clientH, 0.1, 100);
    camera.position.z = 6;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(clientW, clientH);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    const getSizes = () => {
      let fov = camera.fov * (Math.PI / 180);
      let h = camera.position.z * Math.tan(fov / 2) * 2;
      let w = h * camera.aspect;
      return { width: w, height: h };
    };

    let sizes = getSizes();

    const pageThickness = 0.01;
    const pageSpacing = 1;
    const meshCount = 30;
    const pageWidth = 2;
    const pageHeight = 3;

    const scrollY = {
      target: 0,
      current: 0,
      direction: -1,
    };

    const touch = {
      startX: 0,
      lastX: 0,
      isActive: false,
    };

    let material: THREE.ShaderMaterial;
    let geometry: THREE.BoxGeometry;
    let instancedMesh: THREE.InstancedMesh;
    let anim: gsap.core.Timeline;

    // Load texture atlas & create meshes
    const loadTextureAtlas = async () => {
      const imagePaths = Array.from({ length: 13 }, (_, i) => `/512/p${i + 1}.jpg`);

      const imagePromises = imagePaths.map((path) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => {
            // Fallback to high quality unsplash if local path fails
            const fallbackImg = new Image();
            fallbackImg.crossOrigin = "anonymous";
            fallbackImg.onload = () => resolve(fallbackImg);
            fallbackImg.src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=256&auto=format&fit=crop`;
          };
          img.src = path;
        });
      });

      const images = await Promise.all(imagePromises);

      const atlasWidth = Math.max(...images.map((img) => img.width));
      let totalHeight = 0;
      images.forEach((img) => {
        totalHeight += img.height;
      });

      const atlasCanvas = document.createElement("canvas");
      atlasCanvas.width = atlasWidth;
      atlasCanvas.height = totalHeight;
      const ctx = atlasCanvas.getContext("2d")!;

      let currentY = 0;
      const imageInfos = images.map((img) => {
        const aspectRatio = img.width / img.height;
        ctx.drawImage(img, 0, currentY);

        const info = {
          width: img.width,
          height: img.height,
          aspectRatio,
          uvs: {
            xStart: 0,
            xEnd: img.width / atlasWidth,
            yStart: 1 - currentY / totalHeight,
            yEnd: 1 - (currentY + img.height) / totalHeight,
          },
        };
        currentY += img.height;
        return info;
      });

      const atlasTexture = new THREE.Texture(atlasCanvas);
      atlasTexture.needsUpdate = true;

      // Create Material
      material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        uniforms: {
          uCurrentPage: new THREE.Uniform(0),
          uProgress: new THREE.Uniform(0),
          uSplitProgress: new THREE.Uniform(0),
          uPageThickness: new THREE.Uniform(pageThickness),
          uPageWidth: new THREE.Uniform(pageWidth),
          uPageHeight: new THREE.Uniform(pageHeight),
          uMeshCount: new THREE.Uniform(meshCount),
          uTime: new THREE.Uniform(0),
          uAtlas: new THREE.Uniform(atlasTexture),
          uScrollY: { value: 0 },
          uSpeedY: { value: 0 },
          uPageSpacing: new THREE.Uniform(pageSpacing),
        },
      });

      // Create Geometry
      geometry = new THREE.BoxGeometry(pageWidth, pageHeight, pageThickness, 50, 50, 1);

      // Create Instanced Mesh
      instancedMesh = new THREE.InstancedMesh(geometry, material, meshCount);

      const aTextureCoords = new Float32Array(meshCount * 4);
      const aIndex = new Float32Array(meshCount);

      for (let i = 0; i < meshCount; i++) {
        const imageIndex = i % imageInfos.length;
        aTextureCoords[i * 4 + 0] = imageInfos[imageIndex].uvs.xStart;
        aTextureCoords[i * 4 + 1] = imageInfos[imageIndex].uvs.xEnd;
        aTextureCoords[i * 4 + 2] = imageInfos[imageIndex].uvs.yStart;
        aTextureCoords[i * 4 + 3] = imageInfos[imageIndex].uvs.yEnd;
        aIndex[i] = i;
      }

      instancedMesh.geometry.setAttribute(
        "aTextureCoords",
        new THREE.InstancedBufferAttribute(aTextureCoords, 4)
      );

      instancedMesh.geometry.setAttribute(
        "aIndex",
        new THREE.InstancedBufferAttribute(aIndex, 1)
      );

      scene.add(instancedMesh);
      setLoading(false);

      // Play intro animation
      anim = gsap.timeline();
      anim.fromTo(
        material.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: 3,
          ease: "power2.inOut",
        }
      );
      anim.fromTo(
        material.uniforms.uSplitProgress,
        { value: 0 },
        {
          value: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.6"
      );
    };

    loadTextureAtlas();

    // Wheel listener locally on container to prevent global conflicts
    const handleWheel = (e: WheelEvent) => {
      if (loading) return;
      e.preventDefault();
      const sY = (e.deltaY * sizes.height) / container.clientHeight;
      scrollY.target += sY;
      if (material) {
        material.uniforms.uSpeedY.value += sY;
      }
    };

    // Touch event listeners
    const handleTouchStart = (e: TouchEvent) => {
      if (loading) return;
      const t = e.touches[0];
      touch.startX = t.clientX;
      touch.lastX = t.clientX;
      touch.isActive = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touch.isActive || loading) return;
      const t = e.touches[0];
      const deltaX = touch.lastX - t.clientX;
      const sY = ((deltaX * sizes.height) / container.clientHeight) * 2;
      scrollY.target += sY;
      if (material) {
        material.uniforms.uSpeedY.value += sY;
      }
      touch.lastX = t.clientX;
    };

    const handleTouchEnd = () => {
      touch.isActive = false;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    // Render loop
    const clock = new THREE.Clock();
    let reqId: number;
    const tick = () => {
      if (material) {
        scrollY.current = gsap.utils.interpolate(scrollY.current, scrollY.target, 0.12);
        material.uniforms.uScrollY.value = scrollY.current;
        material.uniforms.uSpeedY.value *= 0.835;
        material.uniforms.uTime.value = clock.getElapsedTime();
      }
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(tick);
    };
    reqId = requestAnimationFrame(tick);

    // Resize handler
    const handleResize = () => {
      clientW = container.clientWidth;
      clientH = container.clientHeight;
      camera.aspect = clientW / clientH;
      camera.updateProjectionMatrix();
      sizes = getSizes();
      renderer.setSize(clientW, clientH);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      if (anim) anim.kill();
      if (instancedMesh) scene.remove(instancedMesh);
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[450px] bg-[#131313] text-white overflow-hidden rounded-2xl border border-white/5 flex flex-col items-center justify-center select-none"
    >
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="flex flex-col items-center gap-3">
            <span className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin" />
            <span className="text-[12px] font-bold text-gray-400">Loading Magazine Atlas...</span>
          </div>
        </div>
      )}
      
      {/* ThreeJS canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full pointer-events-none" />

      {/* Floating Instructions */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/50 border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest text-white/80 uppercase backdrop-blur-sm">
        Hover & Use Scroll Wheel or Drag to Flip Pages
      </div>
    </div>
  );
}
