"use client";
import React, { useRef, useEffect, useState } from "react";

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.0,
  particleDensity = 100,
  className = "",
  particleColor = "#ffffff",
  speed = 1,
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef();
  const particlesRef = useRef([]);

  // Initialize particles
  const initParticles = (width, height) => {
    const particles = [];
    const numParticles =
      Math.floor((width * height) / 10000) * (particleDensity / 100);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed * 0.5,
        speedY: (Math.random() - 0.5) * speed * 0.5,
        opacity: Math.random(),
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }

    particlesRef.current = particles;
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Update opacity for twinkling effect
      particle.opacity += particle.fadeDirection * 0.01;
      if (particle.opacity <= 0 || particle.opacity >= 1) {
        particle.fadeDirection *= -1;
      }
      particle.opacity = Math.max(0, Math.min(1, particle.opacity));

      // Wrap around screen edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Draw particle
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particleColor;
      ctx.shadowBlur = particle.size * 2;
      ctx.shadowColor = particleColor;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Add sparkle cross effect
      ctx.strokeStyle = particleColor;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(particle.x - particle.size * 2, particle.y);
      ctx.lineTo(particle.x + particle.size * 2, particle.y);
      ctx.moveTo(particle.x, particle.y - particle.size * 2);
      ctx.lineTo(particle.x, particle.y + particle.size * 2);
      ctx.stroke();

      ctx.restore();
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    setDimensions({ width, height });
    initParticles(width, height);
  };

  useEffect(() => {
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, particleColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        background,
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  );
};
