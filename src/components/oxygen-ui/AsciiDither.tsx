import { useEffect, useRef } from 'react';

const ASCII_CHARS = "  .:;~=+*#%@";

export function AsciiDither() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Mouse interaction
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      // Send mouse away slowly
      targetMouseY = canvas.height * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : 500;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    targetMouseX = canvas.width / 2;
    mouseX = canvas.width / 2;
    targetMouseY = canvas.height / 2;
    mouseY = canvas.height / 2;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      
      ctx.font = '14px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const charWidth = 12;
      const charHeight = 16;
      const cols = Math.ceil(canvas.width / charWidth);
      const rows = Math.ceil(canvas.height / charHeight);
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * charWidth + charWidth / 2;
          const py = y * charHeight + charHeight / 2;
          
          const nx = x / cols;
          const ny = y / rows;
          const aspect = canvas.width / canvas.height;
          
          // Normalized coordinates aware of aspect ratio
          const ax = (nx - 0.5) * aspect;
          const ay = ny - 0.5;
          
          const angle = Math.atan2(ay, ax);
          const radius = Math.sqrt(ax * ax + ay * ay);
          
          // Revolving whirlpool effect
          const spin = angle - time * 0.3;
          
          // Water-like spiral arms moving inwards
          // Adding time to the radius component makes it flow towards the center
          const arms = Math.sin(spin * 5 + radius * 20 + time * 2.5);
          const secondaryArms = Math.cos(spin * 3 + radius * 12 + time * 1.5);
          
          // Base fluid noise
          const wave1 = Math.sin(ax * 15 + time * 0.8);
          const wave2 = Math.cos(ay * 15 - time * 0.8);
          const fluid = (wave1 + wave2) * 0.15;
          
          // Combine whirlpool arms and fluid
          let water = (arms * 0.6 + secondaryArms * 0.4 + 1) * 0.4 + fluid;
          
          // Mouse interaction - radial ripples
          const mdx = px - mouseX;
          const mdy = py - mouseY;
          const distFromMouse = Math.sqrt(mdx * mdx + mdy * mdy);
          const mouseRipple = Math.sin(distFromMouse * 0.05 - time * 3) * Math.max(0, 1 - distFromMouse / 250);
          
          water += mouseRipple * 0.15;
          
          // Masking: fill the whole section but hollow out the center
          const centerHole = Math.min(1, Math.max(0, (radius - 0.12) * 4.0)); 
          // Very subtle fade at the absolute edges to avoid hard cutoffs
          const edgeFade = Math.min(1, Math.max(0, 1.8 - radius));
          
          let intensity = water * centerHole * edgeFade;
          
          if (intensity > 0.05) {
            let charIdx = Math.floor(intensity * ASCII_CHARS.length);
            if (charIdx < 0) charIdx = 0;
            if (charIdx >= ASCII_CHARS.length) charIdx = ASCII_CHARS.length - 1;
            
            const char = ASCII_CHARS[charIdx];
            
            ctx.globalAlpha = Math.min(1, intensity * 2);
            
            if (intensity > 0.6) {
               ctx.fillStyle = `rgba(180, 200, 240, ${ctx.globalAlpha})`; // Subtle highlight
            } else if (intensity > 0.3) {
               ctx.fillStyle = `rgba(80, 110, 180, ${ctx.globalAlpha})`; // Medium subtle blue
            } else {
               ctx.fillStyle = `rgba(40, 60, 120, ${ctx.globalAlpha})`; // Deep subtle blue
            }
            
            ctx.fillText(char, px, py);
          }
        }
      }
      
      time += 0.02; // Smooth constant movement
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none opacity-90" 
    />
  );
}


