import React, { useEffect, useRef } from "react";
import isColorLight from "../../utils/calculation/isColorLight";
import { useTheme } from "../../utils/hooks/useTheme";
import "./ParticleBackground.css";

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const intVal = parseInt(hex, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
  };
}

// Convert (r,g,b) to HSL
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l };
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number) {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l; // gray
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hx = Math.round(x * 255).toString(16);
    return hx.length === 1 ? "0" + hx : hx;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Clamp a color's HSL lightness into [minL..maxL]
function clampLightness(hexColor: string, minL = 0.15, maxL = 0.85): string {
  const { r, g, b } = hexToRgb(hexColor);
  let { h, s, l } = rgbToHsl(r, g, b);

  if (l < minL) l = minL;
  if (l > maxL) l = maxL;
  return hslToHex(h, s, l);
}

// Return sum of absolute differences in R/G/B
function colorDifference(hex1: string, hex2: string) {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  return Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b);
}

// Convert hex to RGBA with alpha
function hexToRGBA(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  opacity: number;
  vx: number;
  vy: number;
}

interface ParticlesBackgroundProps {
  numberOfParticles?: number;
  parallaxFactor?: number;
  speed?: number;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = () => {
  const numberOfParticles = 30;
  const parallaxFactor = 0.2;
  const speed = 0.2;

  const { currentTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX: number | null = null;
    let mouseY: number | null = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const initParticles = () => {
      particlesRef.current = Array.from({ length: numberOfParticles }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));
    };
    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const bgBright = isColorLight(currentTheme.background.base);
    // If bright, pick from dark scale, else pick from light scale
    const colorArray = bgBright
      ? [
          currentTheme.background.dark1,
          currentTheme.background.dark2,
          currentTheme.background.dark3,
          currentTheme.background.dark4,
          currentTheme.background.dark5,
        ]
      : [
          currentTheme.background.light1,
          currentTheme.background.light2,
          currentTheme.background.light3,
          currentTheme.background.light4,
          currentTheme.background.light5,
        ];

    const clampedColors = colorArray.map((c) => clampLightness(c, 0.15, 0.85));
    function getParticleColor(z: number) {
      const ratio = (z - 1) / 3; // 0..1
      const idx = Math.min(Math.floor(ratio * clampedColors.length), 4);
      return clampedColors[idx];
    }

    const lineColor = clampedColors[0];

    const render = () => {
      // Refresh
      ctx.fillStyle = currentTheme.background.base;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parallax
      if (mouseX !== null && mouseY !== null) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        particlesRef.current.forEach((p) => {
          p.x += ((dx * parallaxFactor) / p.z) * 0.01;
          p.y += ((dy * parallaxFactor) / p.z) * 0.01;
        });
      }

      // Draw particles
      particlesRef.current.forEach((p) => {
        const color = getParticleColor(p.z);

        // If color difference from background is large, scale down the opacity (looks better, more subtle)
        const diff = colorDifference(color, currentTheme.background.base);
        let alphaScale = 1;
        const threshold = 150;
        if (diff > threshold) {
          const over = diff - threshold; // how far above threshold
          alphaScale = Math.max(0.3, 1 - over / 255);
        }

        const finalAlpha = p.opacity * alphaScale;

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;

        ctx.globalAlpha = finalAlpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.z, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.restore();

        // Update
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -200) p.x = canvas.width;
        if (p.x > canvas.width + 200) p.x = 0;
        if (p.y < -200) p.y = canvas.height;
        if (p.y > canvas.height + 200) p.y = 0;
      });

      // Connects points with lines when close
      particlesRef.current.forEach((p, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const q = particlesRef.current[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 100) {
            const alpha = 1 - dist / 100;
            ctx.strokeStyle = hexToRGBA(lineColor, alpha);
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [numberOfParticles, parallaxFactor, speed, currentTheme]);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};

export default ParticlesBackground;
