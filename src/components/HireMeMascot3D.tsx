import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HireMeMascot3DProps {
  size?: number;
}

export const HireMeMascot3D: React.FC<HireMeMascot3DProps> = ({ size = 56 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const [webglReady, setWebglReady] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      setWebglReady(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0.25, 4.3);
    camera.lookAt(0, 0.1, 0);

    // Studio Lighting (Warm key + cool rim + soft fill)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e0, 1.5);
    keyLight.position.set(2.5, 4, 3.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x34d399, 1.1);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xf5b942, 0.8, 10);
    fillLight.position.set(0, -1.5, 2.5);
    scene.add(fillLight);

    // Materials
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0xf4f4f6,
      roughness: 0.25,
      metalness: 0.18,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x27272f,
      roughness: 0.35,
      metalness: 0.45,
    });
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x101018,
      roughness: 0.12,
      metalness: 0.75,
    });
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x34d399,
      emissiveIntensity: 1.4,
      roughness: 0.1,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5b942,
      emissive: 0xf5b942,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.4,
    });

    // Root Character Group
    const mascot = new THREE.Group();
    scene.add(mascot);

    // Body (Cute rounded torso)
    const bodyGeo = new THREE.CapsuleGeometry(0.44, 0.34, 12, 24);
    const body = new THREE.Mesh(bodyGeo, shellMat);
    body.position.set(0, -0.42, 0);
    mascot.add(body);

    // Chest glowing status core
    const coreGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const core = new THREE.Mesh(coreGeo, eyeMat);
    core.position.set(0, -0.36, 0.41);
    core.scale.set(1, 0.7, 0.45);
    mascot.add(core);

    // Head Group (rotates toward mouse!)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.44, 0);
    mascot.add(headGroup);

    // Main Head Sphere (slightly wide & cute)
    const headGeo = new THREE.SphereGeometry(0.62, 32, 32);
    const head = new THREE.Mesh(headGeo, shellMat);
    head.scale.set(1.08, 0.94, 0.96);
    headGroup.add(head);

    // Ear pods
    const earGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.14, 20);
    const leftEar = new THREE.Mesh(earGeo, accentMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-0.66, 0, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, accentMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(0.66, 0, 0);
    headGroup.add(rightEar);

    // Glossy Visor Faceplate
    const visorGeo = new THREE.SphereGeometry(0.55, 28, 28, -Math.PI * 0.36, Math.PI * 0.72, Math.PI * 0.28, Math.PI * 0.44);
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.rotation.y = Math.PI / 2;
    visor.position.set(0, 0.01, 0.12);
    headGroup.add(visor);

    // Glowing Eyes (blink!)
    const eyeGeo = new THREE.CapsuleGeometry(0.065, 0.08, 8, 16);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.19, 0.02, 0.59);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.19, 0.02, 0.59);
    headGroup.add(rightEye);

    // Antenna + Golden Tip
    const stemGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.24, 12);
    const stem = new THREE.Mesh(stemGeo, accentMat);
    stem.position.set(0, 0.66, 0);
    headGroup.add(stem);

    const tipGeo = new THREE.SphereGeometry(0.085, 16, 16);
    const tip = new THREE.Mesh(tipGeo, goldMat);
    tip.position.set(0, 0.82, 0);
    headGroup.add(tip);

    // Left Arm (resting gently)
    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(-0.56, -0.22, 0);
    mascot.add(leftArmPivot);

    const armGeo = new THREE.CapsuleGeometry(0.13, 0.32, 8, 16);
    const leftArm = new THREE.Mesh(armGeo, shellMat);
    leftArm.position.set(0, -0.18, 0);
    leftArm.rotation.z = 0.25;
    leftArmPivot.add(leftArm);

    // Right Arm (Waving Hello!)
    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(0.56, -0.18, 0.05);
    mascot.add(rightArmPivot);

    const rightArm = new THREE.Mesh(armGeo, shellMat);
    rightArm.position.set(0.12, 0.22, 0);
    rightArm.rotation.z = -0.45;
    rightArmPivot.add(rightArm);

    // Mouse tracking
    const targetLook = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetLook.x = Math.max(-0.45, Math.min(0.45, nx * 0.45));
      targetLook.y = Math.max(-0.25, Math.min(0.28, ny * 0.28));
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Visibility pause via IntersectionObserver
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        const isHovered = hoveredRef.current;

        // Gentle floating bob (bouncier on hover)
        const bobSpeed = isHovered ? 5.5 : 2.4;
        const bobAmp = isHovered ? 0.11 : 0.07;
        mascot.position.y = Math.sin(t * bobSpeed) * bobAmp;

        // Friendly waving right arm!
        const waveSpeed = isHovered ? 11.0 : 5.5;
        const waveAmp = isHovered ? 0.42 : 0.28;
        rightArmPivot.rotation.z = Math.sin(t * waveSpeed) * waveAmp;

        // Subtle left arm sway
        leftArmPivot.rotation.z = Math.sin(t * 2.2) * 0.08;

        // Smooth head look toward mouse
        headGroup.rotation.y += (targetLook.x - headGroup.rotation.y) * 0.08;
        headGroup.rotation.x += (-targetLook.y - headGroup.rotation.x) * 0.08;

        // Periodic cute blink every ~3.2s
        const blinkCycle = t % 3.2;
        const eyeScaleY = blinkCycle > 3.04 ? 0.12 : 1;
        leftEye.scale.y += (eyeScaleY - leftEye.scale.y) * 0.45;
        rightEye.scale.y += (eyeScaleY - rightEye.scale.y) * 0.45;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      bodyGeo.dispose();
      coreGeo.dispose();
      headGeo.dispose();
      earGeo.dispose();
      visorGeo.dispose();
      eyeGeo.dispose();
      stemGeo.dispose();
      tipGeo.dispose();
      armGeo.dispose();
      shellMat.dispose();
      accentMat.dispose();
      visorMat.dispose();
      eyeMat.dispose();
      goldMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  if (!webglReady) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      style={{ width: size, height: size }}
      className="relative shrink-0 cursor-pointer select-none"
      aria-hidden="true"
    />
  );
};
