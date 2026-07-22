"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

type GateType = "WIRE" | "NOT" | "AND" | "NAND" | "OR" | "NOR" | "XOR" | "XNOR";

interface GateVisualizerProps {
  gate: GateType;
  inputs: boolean[];
  output: boolean;
}

function createGateShape(gate: GateType): THREE.Shape {
  const shape = new THREE.Shape();
  switch (gate) {
    case "WIRE":
      shape.moveTo(-1.5, -0.25);
      shape.lineTo(1.5, -0.25);
      shape.lineTo(1.5, 0.25);
      shape.lineTo(-1.5, 0.25);
      shape.closePath();
      break;
    case "NOT":
      shape.moveTo(-1.0, -0.8);
      shape.lineTo(0.5, 0);
      shape.lineTo(-1.0, 0.8);
      shape.closePath();
      break;
    case "AND":
      shape.moveTo(-1.0, -0.8);
      shape.lineTo(-0.1, -0.8);
      shape.bezierCurveTo(0.9, -0.8, 1.2, -0.4, 1.2, 0);
      shape.bezierCurveTo(1.2, 0.4, 0.9, 0.8, -0.1, 0.8);
      shape.lineTo(-1.0, 0.8);
      shape.closePath();
      break;
    case "NAND":
      shape.moveTo(-1.0, -0.8);
      shape.lineTo(-0.1, -0.8);
      shape.bezierCurveTo(0.9, -0.8, 1.2, -0.4, 1.2, 0);
      shape.bezierCurveTo(1.2, 0.4, 0.9, 0.8, -0.1, 0.8);
      shape.lineTo(-1.0, 0.8);
      shape.closePath();
      break;
    case "OR":
      shape.moveTo(-1.2, -0.8);
      shape.bezierCurveTo(-0.4, -0.8, 0.2, -0.2, 0.5, 0);
      shape.bezierCurveTo(0.2, 0.2, -0.4, 0.8, -1.2, 0.8);
      shape.bezierCurveTo(-0.6, 0.2, -0.6, -0.2, -1.2, -0.8);
      shape.closePath();
      break;
    case "NOR":
      shape.moveTo(-1.2, -0.8);
      shape.bezierCurveTo(-0.4, -0.8, 0.2, -0.2, 0.5, 0);
      shape.bezierCurveTo(0.2, 0.2, -0.4, 0.8, -1.2, 0.8);
      shape.bezierCurveTo(-0.6, 0.2, -0.6, -0.2, -1.2, -0.8);
      shape.closePath();
      break;
    case "XOR":
      shape.moveTo(-1.2, -0.8);
      shape.bezierCurveTo(-0.4, -0.8, 0.2, -0.2, 0.5, 0);
      shape.bezierCurveTo(0.2, 0.2, -0.4, 0.8, -1.2, 0.8);
      shape.bezierCurveTo(-0.6, 0.2, -0.6, -0.2, -1.2, -0.8);
      shape.closePath();
      break;
    case "XNOR":
      shape.moveTo(-1.2, -0.8);
      shape.bezierCurveTo(-0.4, -0.8, 0.2, -0.2, 0.5, 0);
      shape.bezierCurveTo(0.2, 0.2, -0.4, 0.8, -1.2, 0.8);
      shape.bezierCurveTo(-0.6, 0.2, -0.6, -0.2, -1.2, -0.8);
      shape.closePath();
      break;
  }
  return shape;
}

function createLeverMesh(isOn: boolean): THREE.Group {
  const group = new THREE.Group();

  const baseGeom = new THREE.CylinderGeometry(0.22, 0.25, 0.12, 24);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x3a3f48,
    metalness: 0.9,
    roughness: 0.2,
  });
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.rotation.x = Math.PI / 2;
  group.add(base);

  const trackGeom = new THREE.BoxGeometry(0.06, 0.5, 0.06);
  const trackMat = new THREE.MeshStandardMaterial({
    color: 0x2a2e36,
    metalness: 0.8,
    roughness: 0.3,
  });
  const track = new THREE.Mesh(trackGeom, trackMat);
  track.position.set(0, 0.05, 0.08);
  group.add(track);

  const handleGeom = new THREE.SphereGeometry(0.1, 16, 16);
  const handleMat = new THREE.MeshStandardMaterial({
    color: isOn ? 0x00ff6a : 0x666666,
    metalness: 0.7,
    roughness: 0.2,
    emissive: isOn ? 0x00ff6a : 0x000000,
    emissiveIntensity: isOn ? 0.5 : 0,
  });
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.position.set(0, isOn ? 0.22 : -0.15, 0.08);
  group.add(handle);

  if (isOn) {
    const glowGeom = new THREE.SphereGeometry(0.16, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00ff6a,
      transparent: true,
      opacity: 0.25,
    });
    const glow = new THREE.Mesh(glowGeom, glowMat);
    glow.position.copy(handle.position);
    group.add(glow);
  }

  const labelGeom = new THREE.RingGeometry(0.26, 0.3, 32);
  const labelMat = new THREE.MeshBasicMaterial({
    color: isOn ? 0x00ff6a : 0x444444,
    transparent: true,
    opacity: isOn ? 0.6 : 0.3,
    side: THREE.DoubleSide,
  });
  const label = new THREE.Mesh(labelGeom, labelMat);
  label.position.set(0, 0, 0.01);
  group.add(label);

  return group;
}

function createElectricArc(
  scene: THREE.Scene,
  points: THREE.Vector3[],
  color: number,
  intensity: number
): THREE.Line[] {
  const lines: THREE.Line[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    const segments = 12;
    const arcPoints: THREE.Vector3[] = [];

    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      const base = new THREE.Vector3().lerpVectors(start, end, t);
      const noise = new THREE.Vector3(
        (Math.random() - 0.5) * 0.08 * intensity,
        (Math.random() - 0.5) * 0.08 * intensity,
        (Math.random() - 0.5) * 0.04 * intensity
      );
      const falloff = Math.sin(t * Math.PI);
      base.add(noise.multiplyScalar(falloff));
      arcPoints.push(base);
    }

    const curve = new THREE.CatmullRomCurve3(arcPoints);
    const tubeGeom = new THREE.TubeGeometry(curve, 20, 0.008 * intensity, 6, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const tube = new THREE.Mesh(tubeGeom, tubeMat);
    scene.add(tube);
    lines.push(tube as any);

    const glowGeom = new THREE.TubeGeometry(curve, 20, 0.025 * intensity, 6, false);
    const glowMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeom, glowMat);
    scene.add(glow);
    lines.push(glow as any);
  }
  return lines;
}

export default function GateVisualizer({ gate, inputs, output }: GateVisualizerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const stateRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    levers: THREE.Group[];
    gateMesh: THREE.Mesh | null;
    outputSphere: THREE.Mesh | null;
    electricLines: THREE.Line[];
    time: number;
  }>({
    scene: null,
    camera: null,
    levers: [],
    gateMesh: null,
    outputSphere: null,
    electricLines: [],
    time: 0,
  });

  const hasBubble = useMemo(
    () => gate === "NOT" || gate === "NAND" || gate === "NOR" || gate === "XNOR",
    [gate]
  );
  const hasExtraLine = useMemo(() => gate === "XOR" || gate === "XNOR", [gate]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a1d23, 0.06);
    stateRef.current.scene = scene;

    const camera = new THREE.PerspectiveCamera(42, 2, 0.1, 100);
    camera.position.set(0, 0.5, 6.5);
    camera.lookAt(0, 0, 0);
    stateRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0x445566, 0.5));

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
    mainLight.position.set(4, 6, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x6688aa, 0.3);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const neonLight = new THREE.PointLight(0x00ff6a, 0.6, 12);
    neonLight.position.set(0, 2, 4);
    scene.add(neonLight);

    const gateShape = createGateShape(gate);
    const gateGeometry = new THREE.ExtrudeGeometry(gateShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 3,
    });
    gateGeometry.center();

    const gateMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a5a3a,
      metalness: 0.75,
      roughness: 0.18,
      emissive: 0x003311,
      emissiveIntensity: 0.3,
    });
    const gateMesh = new THREE.Mesh(gateGeometry, gateMaterial);
    gateMesh.position.set(0.3, 0, 0);
    scene.add(gateMesh);
    stateRef.current.gateMesh = gateMesh;

    const edgeGeom = new THREE.EdgesGeometry(gateGeometry, 15);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x00ff6a, transparent: true, opacity: 0.5 });
    const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
    edgeLines.position.copy(gateMesh.position);
    scene.add(edgeLines);

    if (hasBubble) {
      const bGeom = new THREE.SphereGeometry(0.14, 24, 24);
      const bMat = new THREE.MeshStandardMaterial({
        color: 0x2a5a3a,
        metalness: 0.8,
        roughness: 0.15,
        emissive: 0x00ff6a,
        emissiveIntensity: 0.2,
      });
      const bubble = new THREE.Mesh(bGeom, bMat);
      bubble.position.set(1.7, 0, 0.25);
      scene.add(bubble);

      const bEdge = new THREE.EdgesGeometry(bGeom);
      const bEdgeMat = new THREE.LineBasicMaterial({ color: 0x00ff6a, transparent: true, opacity: 0.5 });
      const bEdgeLines = new THREE.LineSegments(bEdge, bEdgeMat);
      bEdgeLines.position.copy(bubble.position);
      scene.add(bEdgeLines);
    }

    if (hasExtraLine) {
      const extraShape = new THREE.Shape();
      extraShape.moveTo(-1.2, -0.8);
      extraShape.bezierCurveTo(-0.4, -0.8, 0.2, -0.2, 0.5, 0);
      extraShape.bezierCurveTo(0.2, 0.2, -0.4, 0.8, -1.2, 0.8);
      extraShape.bezierCurveTo(-0.6, 0.2, -0.6, -0.2, -1.2, -0.8);
      extraShape.closePath();

      const pts = extraShape.getPoints(50).map((p) => new THREE.Vector3(p.x - 0.2, p.y, 0.28));
      const curve = new THREE.CatmullRomCurve3(pts);
      const tubeGeom = new THREE.TubeGeometry(curve, 50, 0.018, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x00ff6a,
        emissive: 0x00ff6a,
        emissiveIntensity: 0.4,
        metalness: 0.9,
        roughness: 0.1,
      });
      scene.add(new THREE.Mesh(tubeGeom, tubeMat));
    }

    const inputPositions = inputs.length === 1
      ? [new THREE.Vector3(-2.8, 0, 0.25)]
      : [new THREE.Vector3(-2.8, 0.5, 0.25), new THREE.Vector3(-2.8, -0.5, 0.25)];

    const leverGroup: THREE.Group[] = [];
    inputPositions.forEach((pos) => {
      const lever = createLeverMesh(false);
      lever.position.copy(pos);
      scene.add(lever);
      leverGroup.push(lever);
    });
    stateRef.current.levers = leverGroup;

    const outPos = new THREE.Vector3(2.8, 0, 0.25);
    const outGeom = new THREE.SphereGeometry(0.12, 24, 24);
    const outMat = new THREE.MeshStandardMaterial({
      color: 0x555555,
      metalness: 0.8,
      roughness: 0.15,
      emissive: 0x111111,
      emissiveIntensity: 0.2,
    });
    const outSphere = new THREE.Mesh(outGeom, outMat);
    outSphere.position.copy(outPos);
    scene.add(outSphere);
    stateRef.current.outputSphere = outSphere;

    const outGlowGeom = new THREE.SphereGeometry(0.18, 16, 16);
    const outGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00ff6a,
      transparent: true,
      opacity: 0,
    });
    const outGlow = new THREE.Mesh(outGlowGeom, outGlowMat);
    outGlow.position.copy(outPos);
    scene.add(outGlow);
    (outSphere as any).glowMesh = outGlow;

    const platformGeom = new THREE.CylinderGeometry(3.5, 3.5, 0.05, 64);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x1e2128,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.5,
    });
    const platform = new THREE.Mesh(platformGeom, platformMat);
    platform.position.set(0, -1.2, 0);
    platform.rotation.x = 0;
    scene.add(platform);

    const gridHelper = new THREE.GridHelper(7, 20, 0x2a2f38, 0x22262e);
    gridHelper.position.y = -1.17;
    scene.add(gridHelper);

    const particleCount = 60;
    const particleGeom = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 10;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00ff6a,
      size: 0.025,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(particleGeom, particleMat));

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      stateRef.current.time = Date.now() * 0.001;
      const t = stateRef.current.time;

      gateMesh.rotation.y = Math.sin(t * 0.7) * 0.06;
      gateMesh.rotation.x = Math.sin(t * 0.4) * 0.02;

      neonLight.intensity = 0.5 + Math.sin(t * 2) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [gate, hasBubble, hasExtraLine]);

  useEffect(() => {
    const { scene, levers } = stateRef.current;
    if (!scene) return;

    levers.forEach((lever, i) => {
      scene.remove(lever);
    });

    const inputPositions = inputs.length === 1
      ? [new THREE.Vector3(-2.8, 0, 0.25)]
      : [new THREE.Vector3(-2.8, 0.5, 0.25), new THREE.Vector3(-2.8, -0.5, 0.25)];

    const newLevers: THREE.Group[] = [];
    inputPositions.forEach((pos, i) => {
      const lever = createLeverMesh(inputs[i]);
      lever.position.copy(pos);
      scene.add(lever);
      newLevers.push(lever);
    });
    stateRef.current.levers = newLevers;
  }, [inputs]);

  useEffect(() => {
    const { outputSphere } = stateRef.current;
    if (outputSphere) {
      const mat = outputSphere.material as THREE.MeshStandardMaterial;
      const glow = (outputSphere as any).glowMesh as THREE.Mesh;
      const glowMat = glow?.material as THREE.MeshBasicMaterial;
      if (output) {
        mat.color.setHex(0x00ff6a);
        mat.emissive.setHex(0x00ff6a);
        mat.emissiveIntensity = 0.7;
        if (glowMat) glowMat.opacity = 0.35;
      } else {
        mat.color.setHex(0x555555);
        mat.emissive.setHex(0x111111);
        mat.emissiveIntensity = 0.2;
        if (glowMat) glowMat.opacity = 0;
      }
    }
  }, [output]);

  useEffect(() => {
    const { scene, camera } = stateRef.current;
    if (!scene || !camera) return;

    let arcLines: THREE.Line[] = [];

    const inputPositions = inputs.length === 1
      ? [new THREE.Vector3(-2.8, 0, 0.25)]
      : [new THREE.Vector3(-2.8, 0.5, 0.25), new THREE.Vector3(-2.8, -0.5, 0.25)];

    const gateEdgeX = gate === "WIRE" ? -1.5 : -1.0;
    const gateOutX = gate === "WIRE" ? 1.5 : hasBubble ? 1.85 : 1.2;
    const outPos = new THREE.Vector3(2.8, 0, 0.25);

    inputs.forEach((isOn, i) => {
      if (!isOn) return;
      const leverPos = inputPositions[i];
      const wirePoints = [
        leverPos.clone().add(new THREE.Vector3(0.3, 0, 0)),
        new THREE.Vector3((leverPos.x + gateEdgeX) / 2, leverPos.y, 0.25),
        new THREE.Vector3(gateEdgeX + 0.1, leverPos.y, 0.25),
      ];
      const lines = createElectricArc(scene, wirePoints, 0x00ff6a, 1.0);
      arcLines.push(...lines);
    });

    if (output) {
      const wirePoints = [
        new THREE.Vector3(gateOutX + 0.1, 0, 0.25),
        new THREE.Vector3((gateOutX + outPos.x) / 2, 0, 0.25),
        outPos.clone().add(new THREE.Vector3(-0.3, 0, 0)),
      ];
      const lines = createElectricArc(scene, wirePoints, 0x00ff6a, 1.2);
      arcLines.push(...lines);
    }

    stateRef.current.electricLines = arcLines;

    return () => {
      arcLines.forEach((line) => {
        scene.remove(line);
        if ((line as any).geometry) (line as any).geometry.dispose();
        if ((line as any).material) (line as any).material.dispose();
      });
    };
  }, [inputs, output, gate, hasBubble]);

  return (
    <div
      ref={mountRef}
      className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-border bg-background/50"
    />
  );
}
