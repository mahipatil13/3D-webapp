import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { CategoryType, CATEGORY_CONFIG } from '../types';

interface OrbitObjectData {
  category: CategoryType;
  label: string;
  amount: number;
  color: string;
  mesh: THREE.Mesh;
  basePos: THREE.Vector3;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
  bobSpeed: number;
  bobOffset: number;
}

export const SpendingOrbit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeCategoryFilter, setActiveCategoryFilter, categoryBreakdown } = useExpense();
  const [hoveredCategory, setHoveredCategory] = useState<CategoryType | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [labels, setLabels] = useState<Array<{ category: CategoryType; label: string; amount: number; color: string; x: number; y: number; visible: boolean }>>([]);

  const labelsRef = useRef(labels);
  labelsRef.current = labels;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 13);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1a263d, 2.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f5a0, 1.8);
    dirLight2.position.set(-6, -4, -3);
    scene.add(dirLight2);

    const orangePoint = new THREE.PointLight(0xff7b25, 4, 15);
    orangePoint.position.set(3, 2, 2);
    scene.add(orangePoint);

    const bluePoint = new THREE.PointLight(0x3b82f6, 4, 15);
    bluePoint.position.set(-3, -1, 2);
    scene.add(bluePoint);

    // Subtle background particles
    const particleCount = 70;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 20;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.07,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Glowing Orbit Rings
    const createOrbitRing = (radiusX: number, radiusY: number, tilt: number, color: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(100);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p.x, 0, p.y)));
      const ringMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.28,
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.x = Math.PI * 0.35;
      ring.rotation.z = tilt;
      scene.add(ring);
      return ring;
    };

    createOrbitRing(4.8, 3.4, 0.2, 0x00f5a0);
    createOrbitRing(6.0, 4.2, -0.3, 0x38bdf8);

    // Centerpiece: Iridescent Glass / Metallic Orb
    const centerGeo = new THREE.SphereGeometry(1.35, 48, 48);
    const centerMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      emissive: 0x0f172a,
      roughness: 0.1,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const centerOrb = new THREE.Mesh(centerGeo, centerMat);
    scene.add(centerOrb);

    // Center inner glow core
    const innerCoreGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00f5a0,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    centerOrb.add(innerCore);

    // Orbiting Category Objects
    const orbitObjects: OrbitObjectData[] = [];

    // Helper to get category amount
    const getCatAmount = (cat: CategoryType) => {
      const found = categoryBreakdown.find((b) => b.category === cat);
      return found ? found.amount : 0;
    };

    // 1. Food: Rich Orange Sphere
    const foodMat = new THREE.MeshPhysicalMaterial({
      color: 0xff7b25,
      emissive: 0x7c2d12,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.4,
      clearcoat: 0.8,
    });
    const foodMesh = new THREE.Mesh(new THREE.SphereGeometry(1.05, 36, 36), foodMat);
    foodMesh.userData = { category: 'Food' };
    scene.add(foodMesh);
    orbitObjects.push({
      category: 'Food',
      label: 'Food',
      amount: getCatAmount('Food') || 4200,
      color: '#ff7b25',
      mesh: foodMesh,
      basePos: new THREE.Vector3(2.6, 0.7, 1.2),
      orbitRadius: 2.9,
      orbitSpeed: 0.3,
      angle: 0.3,
      bobSpeed: 1.8,
      bobOffset: 0,
    });

    // 2. Transport: Neon Blue Glowing Cube
    const transMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.5,
      clearcoat: 0.9,
    });
    const transMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), transMat);
    transMesh.rotation.set(0.4, 0.5, 0.2);
    transMesh.userData = { category: 'Transport' };
    scene.add(transMesh);
    orbitObjects.push({
      category: 'Transport',
      label: 'Transport',
      amount: getCatAmount('Transport') || 2500,
      color: '#3b82f6',
      mesh: transMesh,
      basePos: new THREE.Vector3(-3.2, -0.6, 1.8),
      orbitRadius: 3.6,
      orbitSpeed: 0.25,
      angle: 2.8,
      bobSpeed: 1.5,
      bobOffset: 1.2,
    });

    // 3. Shopping: Glossy Emerald Green Sphere
    const shopMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f5a0,
      emissive: 0x065f46,
      emissiveIntensity: 0.3,
      roughness: 0.12,
      metalness: 0.3,
      clearcoat: 0.9,
    });
    const shopMesh = new THREE.Mesh(new THREE.SphereGeometry(0.72, 32, 32), shopMat);
    shopMesh.userData = { category: 'Shopping' };
    scene.add(shopMesh);
    orbitObjects.push({
      category: 'Shopping',
      label: 'Shopping',
      amount: getCatAmount('Shopping') || 3000,
      color: '#00f5a0',
      mesh: shopMesh,
      basePos: new THREE.Vector3(-2.4, 1.6, -0.5),
      orbitRadius: 3.1,
      orbitSpeed: 0.35,
      angle: 2.1,
      bobSpeed: 2.1,
      bobOffset: 2.3,
    });

    // 4. Bills: Golden Glowing Torus Ring
    const billMat = new THREE.MeshPhysicalMaterial({
      color: 0xeab308,
      emissive: 0x854d0e,
      emissiveIntensity: 0.4,
      roughness: 0.18,
      metalness: 0.85,
      clearcoat: 0.7,
    });
    const billMesh = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.34, 24, 48), billMat);
    billMesh.rotation.x = Math.PI * 0.4;
    billMesh.userData = { category: 'Bills' };
    scene.add(billMesh);
    orbitObjects.push({
      category: 'Bills',
      label: 'Bills',
      amount: getCatAmount('Bills') || 1750,
      color: '#eab308',
      mesh: billMesh,
      basePos: new THREE.Vector3(2.5, -1.2, 0.6),
      orbitRadius: 3.2,
      orbitSpeed: 0.22,
      angle: 5.4,
      bobSpeed: 1.7,
      bobOffset: 3.8,
    });

    // 5. Other: Purple Glass Sphere
    const otherMat = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0x581c87,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.4,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.92,
    });
    const otherMesh = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), otherMat);
    otherMesh.userData = { category: 'Other' };
    scene.add(otherMesh);
    orbitObjects.push({
      category: 'Other',
      label: 'Other',
      amount: getCatAmount('Other') || 1000,
      color: '#a855f7',
      mesh: otherMesh,
      basePos: new THREE.Vector3(-2.1, -1.9, 0.3),
      orbitRadius: 2.8,
      orbitSpeed: 0.28,
      angle: 3.7,
      bobSpeed: 1.9,
      bobOffset: 4.5,
    });

    // Micro shiny satellite
    const satMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.05 });
    const satMesh = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), satMat);
    scene.add(satMesh);

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const meshes = orbitObjects.map((o) => o.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const cat = intersects[0].object.userData.category as CategoryType;
        if (cat) {
          setActiveCategoryFilter(activeCategoryFilter === cat ? 'All' : cat);
        }
      }
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('click', onClick);

    // Mouse drag interaction to gently orbit the scene
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onDragMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      targetRotationY += deltaX * 0.005;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onDragMove);

    // Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation damping
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      scene.rotation.y = currentRotationY;

      // Animate center orb
      centerOrb.rotation.y = elapsedTime * 0.2;
      centerOrb.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
      innerCore.rotation.y = -elapsedTime * 0.4;

      // Animate orbit objects
      orbitObjects.forEach((obj) => {
        const angle = obj.angle + elapsedTime * obj.orbitSpeed * 0.4;
        const bob = Math.sin(elapsedTime * obj.bobSpeed + obj.bobOffset) * 0.15;
        
        // Circular / elliptical orbit around origin
        obj.mesh.position.x = Math.cos(angle) * obj.orbitRadius;
        obj.mesh.position.z = Math.sin(angle) * (obj.orbitRadius * 0.7);
        obj.mesh.position.y = obj.basePos.y + bob;

        // Custom object spinning
        obj.mesh.rotation.y += 0.01;
        if (obj.mesh.geometry instanceof THREE.BoxGeometry) {
          obj.mesh.rotation.x += 0.008;
        }

        // Highlight selected category
        const isSelected = activeCategoryFilter === obj.category;
        const isHovered = hoveredCategory === obj.category;
        const targetScale = isSelected ? 1.25 : isHovered ? 1.15 : 1.0;
        obj.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      // Animate shiny satellite
      satMesh.position.x = Math.cos(elapsedTime * 0.9) * 2.2;
      satMesh.position.z = Math.sin(elapsedTime * 0.9) * 2.0;
      satMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.6;

      // Raycasting check for hover
      raycaster.setFromCamera(mouse, camera);
      const meshes = orbitObjects.map((o) => o.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        canvas.style.cursor = 'pointer';
        setHoveredCategory(intersects[0].object.userData.category);
      } else {
        canvas.style.cursor = 'grab';
        setHoveredCategory(null);
      }

      // Project 3D positions to 2D screen coordinates for HTML badges
      const tempV = new THREE.Vector3();
      const updatedLabels = orbitObjects.map((obj) => {
        obj.mesh.getWorldPosition(tempV);
        tempV.project(camera);

        const x = (tempV.x * 0.5 + 0.5) * width;
        const y = (-(tempV.y * 0.5) + 0.5) * height;
        const visible = tempV.z < 1;

        return {
          category: obj.category,
          label: obj.label,
          amount: obj.amount,
          color: obj.color,
          x,
          y,
          visible,
        };
      });

      setLabels(updatedLabels);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onDragMove);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [categoryBreakdown, activeCategoryFilter]);

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '380px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Card Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px 0 24px',
        zIndex: 10,
      }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
            Spending orbit
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
            Your expenses, visualized in 3D. Click on a category to filter.
          </p>
        </div>

        {/* Category Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(20, 30, 52, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '6px 12px',
              color: activeCategoryFilter === 'All' ? '#cbd5e1' : '#00f5a0',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <span>{activeCategoryFilter === 'All' ? 'All categories' : activeCategoryFilter}</span>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '36px',
              right: 0,
              width: '150px',
              backgroundColor: '#0d1527',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '10px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
              padding: '4px',
              zIndex: 50,
            }}>
              <button
                onClick={() => {
                  setActiveCategoryFilter('All');
                  setDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: activeCategoryFilter === 'All' ? 'rgba(0, 245, 160, 0.15)' : 'transparent',
                  color: activeCategoryFilter === 'All' ? '#00f5a0' : '#cbd5e1',
                  fontSize: '12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                All categories
              </button>
              {(['Food', 'Transport', 'Shopping', 'Bills', 'Other'] as CategoryType[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategoryFilter(cat);
                    setDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeCategoryFilter === cat ? 'rgba(0, 245, 160, 0.15)' : 'transparent',
                    color: activeCategoryFilter === cat ? '#00f5a0' : '#cbd5e1',
                    fontSize: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: CATEGORY_CONFIG[cat].color }} />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* Floating 2D Category Labels projected from 3D space */}
        {labels.map((lbl) => {
          if (!lbl.visible) return null;
          const isFilterActive = activeCategoryFilter === lbl.category;
          const isHovered = hoveredCategory === lbl.category;

          return (
            <div
              key={lbl.category}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCategoryFilter(isFilterActive ? 'All' : lbl.category);
              }}
              style={{
                position: 'absolute',
                left: `${lbl.x}px`,
                top: `${lbl.y}px`,
                transform: 'translate(-50%, -130%)',
                pointerEvents: 'auto',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.15s ease, opacity 0.15s ease',
                zIndex: 20,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: isFilterActive ? 'rgba(16, 24, 44, 0.95)' : 'rgba(10, 16, 30, 0.75)',
                backdropFilter: 'blur(8px)',
                border: isFilterActive
                  ? `1px solid ${lbl.color}`
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isFilterActive ? `0 0 15px ${lbl.color}40` : '0 4px 12px rgba(0,0,0,0.4)',
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#ffffff',
                whiteSpace: 'nowrap',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: lbl.color,
                  boxShadow: `0 0 6px ${lbl.color}`,
                }} />
                <span>{lbl.label}</span>
                <span style={{ color: '#cbd5e1', fontWeight: 500 }}>
                  ₹{lbl.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          );
        })}

        {/* Reset filter pill if active */}
        {activeCategoryFilter !== 'All' && (
          <button
            onClick={() => setActiveCategoryFilter('All')}
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(0, 245, 160, 0.15)',
              border: '1px solid var(--accent-mint)',
              borderRadius: '20px',
              padding: '5px 12px',
              color: '#00f5a0',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              zIndex: 30,
            }}
          >
            <RefreshCw size={12} />
            <span>Clear filter: {activeCategoryFilter}</span>
          </button>
        )}
      </div>
    </div>
  );
};
