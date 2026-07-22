"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

type GateType = "WIRE" | "NOT" | "AND" | "NAND" | "OR" | "NOR" | "XOR" | "XNOR";

interface GateVisualizerProps {
  gate: GateType;
  inputs: boolean[];
  output: boolean;
}

function createGateGeometry(gate: GateType): THREE.BufferGeometry {
  const shape = new THREE.Shape();

  switch (gate) {
    case "WIRE":
      shape.moveTo(-1.5, -0.3);
      shape.lineTo(1.5, -0.3);
      shape.lineTo(1.5, 0.3);
      shape.lineTo(-1.5, 0.3);
      shape.closePath();
      break;
    case "NOT":
      shape.moveTo(-1.5, -0.8);
      shape.lineTo(0.5, 0);
      shape.lineTo(-1.5, 0.8);
      shape.closePath();
      break;
    case "AND":
      shape.moveTo(-1.5, -0.8);
      shape.lineTo(-0.3, -0.8);
      shape.quadraticCurveTo(1.2, -0.8, 1.2, 0);
      shape.quadraticCurveTo(1.2, 0.8, -0.3, 0.8);
      shape.lineTo(-1.5, 0.8);
      shape.closePath();
      break;
    case "NAND":
      shape.moveTo(-1.5, -0.8);
      shape.lineTo(-0.3, -0.8);
      shape.quadraticCurveTo(1.2, -0.8, 1.2, 0);
      shape.quadraticCurveTo(1.2, 0.8, -0.3, 0.8);
      shape.lineTo(-1.5, 0.8);
      shape.closePath();
      break;
    case "OR":
      shape.moveTo(-1.5, -0.8);
      shape.quadraticCurveTo(-0.5, -0.8, 0, 0);
      shape.quadraticCurveTo(-0.5, 0.8, -1.5, 0.8);
      shape.quadraticCurveTo(-0.3, 0, -1.5, -0.8);
      shape.closePath();
      break;
    case "NOR":
      shape.moveTo(-1.5, -0.8);
      shape.quadraticCurveTo(-0.5, -0.8, 0, 0);
      shape.quadraticCurveTo(-0.5, 0.8, -1.5, 0.8);
      shape.quadraticCurveTo(-0.3, 0, -1.5, -0.8);
      shape.closePath();
      break;
    case "XOR":
      shape.moveTo(-1.5, -0.8);
      shape.quadraticCurveTo(-0.5, -0.8, 0, 0);
      shape.quadraticCurveTo(-0.5, 0.8, -1.5, 0.8);
      shape.quadraticCurveTo(-0.3, 0, -1.5, -0.8);
      shape.closePath();
      break;
    case "XNOR":
      shape.moveTo(-1.5, -0.8);
      shape.quadraticCurveTo(-0.5, -0.8, 0, 0);
      shape.quadraticCurveTo(-0.5, 0.8, -1.5, 0.8);
      shape.quadraticCurveTo(-0.3, 0, -1.5, -0.8);
      shape.closePath();
      break;
  }

  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 3,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

export default function GateVisualizer({ gate, inputs, output }: GateVisualizerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const gateMeshRef = useRef<THREE.Mesh | null>(null);
  const outputMeshRef = useRef<THREE.Mesh | null>(null);
  const inputMeshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 100);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ff6a, 0.6, 10);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    const gateGeometry = createGateGeometry(gate);
    const gateMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff6a,
      emissive: 0x003311,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });
    const gateMesh = new THREE.Mesh(gateGeometry, gateMaterial);
    gateMesh.position.set(0, 0, -0.2);
    scene.add(gateMesh);
    gateMeshRef.current = gateMesh;

    if (gate === "NOT" || gate === "NAND" || gate === "NOR" || gate === "XNOR") {
      const circleGeom = new THREE.SphereGeometry(0.12, 16, 16);
      const circleMat = new THREE.MeshPhongMaterial({ color: 0x00ff6a, emissive: 0x003311 });
      const circle = new THREE.Mesh(circleGeom, circleMat);
      circle.position.set(1.35, 0, 0);
      scene.add(circle);
      outputMeshRef.current = circle;
    }

    const inputPositions = inputs.length === 1
      ? [{ x: -1.5, y: 0 }]
      : [{ x: -1.5, y: 0.4 }, { x: -1.5, y: -0.4 }];

    const inputMeshes: THREE.Mesh[] = [];
    inputPositions.forEach((pos) => {
      const sphereGeom = new THREE.SphereGeometry(0.15, 16, 16);
      const sphereMat = new THREE.MeshPhongMaterial({ color: 0x444444, emissive: 0x111111 });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      sphere.position.set(pos.x - 0.5, pos.y, 0);
      scene.add(sphere);
      inputMeshes.push(sphere);
    });
    inputMeshesRef.current = inputMeshes;

    const outputSphereGeom = new THREE.SphereGeometry(0.15, 16, 16);
    const outputSphereMat = new THREE.MeshPhongMaterial({ color: 0x444444, emissive: 0x111111 });
    const outputSphere = new THREE.Mesh(outputSphereGeom, outputSphereMat);
    outputSphere.position.set(2, 0, 0);
    scene.add(outputSphere);

    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2, 0, 0),
      new THREE.Vector3(-1.5, 0, 0),
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x555555 });
    const line = new THREE.Line(lineGeom, lineMat);
    scene.add(line);

    const outLineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(1.5, 0, 0),
      new THREE.Vector3(2, 0, 0),
    ]);
    const outLine = new THREE.Line(outLineGeom, lineMat);
    scene.add(outLine);

    const animate = () => {
      requestAnimationFrame(animate);
      gateMesh.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [gate]);

  useEffect(() => {
    inputMeshesRef.current.forEach((mesh, i) => {
      if (inputs[i]) {
        (mesh.material as THREE.MeshPhongMaterial).color.setHex(0x00ff6a);
        (mesh.material as THREE.MeshPhongMaterial).emissive.setHex(0x003311);
      } else {
        (mesh.material as THREE.MeshPhongMaterial).color.setHex(0x444444);
        (mesh.material as THREE.MeshPhongMaterial).emissive.setHex(0x111111);
      }
    });
  }, [inputs]);

  useEffect(() => {
    if (outputMeshRef.current) {
      if (output) {
        (outputMeshRef.current.material as THREE.MeshPhongMaterial).color.setHex(0x00ff6a);
        (outputMeshRef.current.material as THREE.MeshPhongMaterial).emissive.setHex(0x003311);
      } else {
        (outputMeshRef.current.material as THREE.MeshPhongMaterial).color.setHex(0x444444);
        (outputMeshRef.current.material as THREE.MeshPhongMaterial).emissive.setHex(0x111111);
      }
    }
  }, [output]);

  return (
    <div
      ref={mountRef}
      className="w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-border"
    />
  );
}
