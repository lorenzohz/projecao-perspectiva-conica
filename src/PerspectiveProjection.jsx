import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

const PerspectiveProjection = () => {
  // Valores iniciais padrão
  const initialViewPoint = { a: 5, b: 5, c: 10 };
  const initialPlanePoints = {
    p1: { x: -3, y: 0, z: 0 },
    p2: { x: 3, y: 0, z: 0 },
    p3: { x: 0, y: 3, z: 0 }
  };
  const initialSelectedObject = 'cube';

  const [viewPoint, setViewPoint] = useState(initialViewPoint);
  const [planePoints, setPlanePoints] = useState(initialPlanePoints);
  const [selectedObject, setSelectedObject] = useState(initialSelectedObject);
  const [projectedVertices, setProjectedVertices] = useState([]);
  const [showProjection, setShowProjection] = useState(true);
  const [showOriginal, setShowOriginal] = useState(true);
  const [showProjectionLines, setShowProjectionLines] = useState(true);
  const [planeSize, setPlaneSize] = useState(15);

  const objects = {
    cube: {
      name: 'Cubo',
      vertices: [
        { x: -1, y: -1, z: 2 },
        { x: 1, y: -1, z: 2 },
        { x: 1, y: 1, z: 2 },
        { x: -1, y: 1, z: 2 },
        { x: -1, y: -1, z: 4 },
        { x: 1, y: -1, z: 4 },
        { x: 1, y: 1, z: 4 },
        { x: -1, y: 1, z: 4 }
      ],
      surfaces: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [0, 1, 5, 4],
        [2, 3, 7, 6],
        [0, 3, 7, 4],
        [1, 2, 6, 5]
      ]
    },
    pyramid: {
      name: 'Pirâmide',
      vertices: [
        { x: -1.5, y: -1, z: 2 },
        { x: 1.5, y: -1, z: 2 },
        { x: 1.5, y: -1, z: 5 },
        { x: -1.5, y: -1, z: 5 },
        { x: 0, y: 2, z: 3.5 }
      ],
      surfaces: [
        [0, 1, 2, 3],
        [0, 1, 4],
        [1, 2, 4],
        [2, 3, 4],
        [3, 0, 4]
      ]
    },
    house: {
      name: 'Casa',
      vertices: [
        { x: -2, y: -1, z: 2 },
        { x: 2, y: -1, z: 2 },
        { x: 2, y: 1, z: 2 },
        { x: -2, y: 1, z: 2 },
        { x: -2, y: -1, z: 5 },
        { x: 2, y: -1, z: 5 },
        { x: 2, y: 1, z: 5 },
        { x: -2, y: 1, z: 5 },
        { x: 0, y: 2.5, z: 2 },
        { x: 0, y: 2.5, z: 5 }
      ],
      surfaces: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [0, 1, 5, 4],
        [2, 3, 7, 6],
        [0, 3, 7, 4],
        [1, 2, 6, 5],
        [3, 2, 8],
        [2, 6, 9, 8],
        [6, 7, 9],
        [7, 3, 8, 9]
      ]
    },
    letter: {
      name: 'Letra L',
      vertices: [
        { x: -1, y: -2, z: 3 },
        { x: 0, y: -2, z: 3 },
        { x: 0, y: 0, z: 3 },
        { x: 2, y: 0, z: 3 },
        { x: 2, y: 1, z: 3 },
        { x: -1, y: 1, z: 3 },
        { x: -1, y: -2, z: 4 },
        { x: 0, y: -2, z: 4 },
        { x: 0, y: 0, z: 4 },
        { x: 2, y: 0, z: 4 },
        { x: 2, y: 1, z: 4 },
        { x: -1, y: 1, z: 4 }
      ],
      surfaces: [
        [0, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11],
        [0, 1, 7, 6],
        [1, 2, 8, 7],
        [2, 3, 9, 8],
        [3, 4, 10, 9],
        [4, 5, 11, 10],
        [5, 0, 6, 11]
      ]
    },
    shark: {
      name: 'Tubarão',
      vertices: [
        { x: 4, y: 0, z: 3.5 },
        { x: 1, y: 1, z: 3.5 },
        { x: 1, y: -1, z: 3.5 },
        { x: 1, y: 0, z: 4.5 },
        { x: 1, y: 0, z: 2.5 },
        { x: -3, y: 0.5, z: 3.5 },
        { x: -3, y: -0.5, z: 3.5 },
        { x: -3, y: 0, z: 4 },
        { x: -3, y: 0, z: 3 },
        { x: -5, y: 2, z: 3.5 },
        { x: -5, y: -1.5, z: 3.5 },
        { x: -0.5, y: 2.5, z: 3.5 },
        { x: 0.5, y: -1, z: 6.5 },
        { x: 0.5, y: -1, z: 0.5 }
      ],
      surfaces: [
        [0, 1, 3],
        [0, 3, 2],
        [0, 4, 1],
        [0, 2, 4],
        [1, 5, 7, 3],
        [3, 7, 6, 2],
        [1, 4, 8, 5],
        [2, 6, 8, 4],
        [5, 9, 7],
        [7, 9, 10],
        [6, 7, 10],
        [5, 8, 9],
        [8, 10, 9],
        [6, 10, 8],
        [1, 11, 5],
        [3, 12, 2],
        [4, 2, 13]
      ]
    }
  };

  const currentObject = objects[selectedObject] || objects.cube;

  const calculateNormal = (p1, p2, p3) => {
    const v1 = {
      x: p1.x - p2.x,
      y: p1.y - p2.y,
      z: p1.z - p2.z
    };
    
    const v2 = {
      x: p3.x - p2.x,
      y: p3.y - p2.y,
      z: p3.z - p2.z
    };
    
    const nx = v1.y * v2.z - v1.z * v2.y;
    const ny = -(v1.x * v2.z - v1.z * v2.x);
    const nz = v1.x * v2.y - v1.y * v2.x;
    
    return { nx, ny, nz };
  };

  const calculateProjectionMatrix = () => {
    const { p1, p2, p3 } = planePoints;
    const r0 = p3; // R0 é sempre igual a P3
    const { a, b, c } = viewPoint;
    
    const { nx, ny, nz } = calculateNormal(p1, p2, p3);
    
    const d0 = r0.x * nx + r0.y * ny + r0.z * nz;
    const d1 = a * nx + b * ny + c * nz;
    const d = d0 - d1;
    
    const matrix = [
      [d + a * nx, a * ny, a * nz, -a * d0],
      [b * nx, d + b * ny, b * nz, -b * d0],
      [c * nx, c * ny, d + c * nz, -c * d0],
      [nx, ny, nz, d0 - d1]
    ];
    
    return { matrix, normal: { nx, ny, nz }, d0, d1, d };
  };

  const multiplyMatrixVector = (matrix, vertex) => {
    const v = [vertex.x, vertex.y, vertex.z, 1];
    const result = [0, 0, 0, 0];
    
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result[i] += matrix[i][j] * v[j];
      }
    }
    
    return result;
  };

  const projectVertices = () => {
    if (!currentObject || !currentObject.vertices) {
      setProjectedVertices([]);
      return;
    }
    
    const { matrix } = calculateProjectionMatrix();
    
    const projected = currentObject.vertices.map(vertex => {
      const [x, y, z, w] = multiplyMatrixVector(matrix, vertex);
      
      const xc = x / w;
      const yc = y / w;
      const zc = z / w;
      
      return { x: xc, y: yc, z: zc, original: vertex };
    });
    
    setProjectedVertices(projected);
  };

  useEffect(() => {
    if (currentObject) {
      projectVertices();
    }
  }, [viewPoint, planePoints, selectedObject]);

  const createPlaneGeometry = () => {
    const { p1, p2, p3 } = planePoints;
    const { nx, ny, nz } = calculateNormal(p1, p2, p3);
    
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
    const normal = new THREE.Vector3(nx / len, ny / len, nz / len);
    
    const v1 = new THREE.Vector3(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z).normalize();
    const v2 = new THREE.Vector3().crossVectors(normal, v1).normalize();
    
    const center = new THREE.Vector3(p3.x, p3.y, p3.z); // R0 = P3
    
    return { center, v1, v2, normal };
  };

  const PlaneVisualization = () => {
    const { center, v1, v2 } = createPlaneGeometry();
    
    const size = planeSize;
    const corners = [
      center.clone().add(v1.clone().multiplyScalar(size)).add(v2.clone().multiplyScalar(size)),
      center.clone().add(v1.clone().multiplyScalar(-size)).add(v2.clone().multiplyScalar(size)),
      center.clone().add(v1.clone().multiplyScalar(-size)).add(v2.clone().multiplyScalar(-size)),
      center.clone().add(v1.clone().multiplyScalar(size)).add(v2.clone().multiplyScalar(-size))
    ];
    
    return (
      <>
        <Line
          points={[corners[0], corners[1], corners[2], corners[3], corners[0]]}
          color="green"
          lineWidth={2}
        />
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={4}
              array={new Float32Array(corners.flatMap(c => [c.x, c.y, c.z]))}
              itemSize={3}
            />
            <bufferAttribute
              attach="index"
              array={new Uint16Array([0, 1, 2, 0, 2, 3])}
              count={6}
              itemSize={1}
            />
          </bufferGeometry>
          <meshStandardMaterial color="green" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </>
    );
  };

  const updatePlanePoint = (point, axis, value) => {
    setPlanePoints(prev => ({
      ...prev,
      [point]: { ...prev[point], [axis]: parseFloat(value) || 0 }
    }));
  };

  const resetToDefaults = () => {
    setViewPoint(initialViewPoint);
    setPlanePoints(initialPlanePoints);
    setSelectedObject(initialSelectedObject);
    setShowOriginal(true);
    setShowProjection(true);
    setShowProjectionLines(true);
  };

  return (
    <div style={{width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#111827', color: 'white'}}>
      {/* Visualização 3D */}
      <div style={{height: 'calc(100vh - 180px)', minHeight: '500px', borderBottom: '4px solid #374151'}}>
        <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <OrbitControls />
          
          <Line points={[[-15, 0, 0], [15, 0, 0]]} color="#ff0000" lineWidth={1} />
          <Line points={[[0, -15, 0], [0, 15, 0]]} color="#00ff00" lineWidth={1} />
          <Line points={[[0, 0, -15], [0, 0, 15]]} color="#0000ff" lineWidth={1} />
          
          <mesh position={[viewPoint.a, viewPoint.b, viewPoint.c]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
          </mesh>
          
          <PlaneVisualization />
          
          <mesh position={[planePoints.p1.x, planePoints.p1.y, planePoints.p1.z]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="lime" />
          </mesh>
          <mesh position={[planePoints.p2.x, planePoints.p2.y, planePoints.p2.z]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="lime" />
          </mesh>
          <mesh position={[planePoints.p3.x, planePoints.p3.y, planePoints.p3.z]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="lime" />
          </mesh>
          
          {showOriginal && currentObject && currentObject.surfaces && currentObject.vertices && currentObject.surfaces.map((surface, idx) => {
            const points = surface.map(i => {
              const vertex = currentObject.vertices[i];
              if (!vertex) return new THREE.Vector3(0, 0, 0);
              return new THREE.Vector3(vertex.x, vertex.y, vertex.z);
            });
            points.push(points[0]);
            
            return <Line key={`orig-${idx}`} points={points} color="cyan" lineWidth={2} />;
          })}
          
          {showProjectionLines && showProjection && projectedVertices && projectedVertices.length > 0 && projectedVertices.map((proj, idx) => (
            proj && <Line
              key={`proj-line-${idx}`}
              points={[
                [proj.x, proj.y, proj.z],
                [viewPoint.a, viewPoint.b, viewPoint.c]
              ]}
              color="gray"
              lineWidth={1}
              transparent
              opacity={0.4}
            />
          ))}
          
          {showProjection && currentObject && currentObject.surfaces && projectedVertices && projectedVertices.length === currentObject.vertices.length && currentObject.surfaces.map((surface, idx) => {
            const points = surface.map(i => {
              const proj = projectedVertices[i];
              if (!proj) return new THREE.Vector3(0, 0, 0);
              return new THREE.Vector3(proj.x, proj.y, proj.z);
            });
            points.push(points[0]);
            
            return <Line key={`proj-${idx}`} points={points} color="red" lineWidth={3} />;
          })}
          
          {showProjection && projectedVertices && projectedVertices.length > 0 && projectedVertices.map((proj, idx) => (
            proj && <mesh key={`proj-vertex-${idx}`} position={[proj.x, proj.y, proj.z]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.3} />
            </mesh>
          ))}
        </Canvas>
      </div>

      {/* CONTROLES */}
      <div style={{height: '180px', backgroundColor: '#1f2937', padding: '12px', overflow: 'auto'}}>
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px', height: '100%', flexWrap: 'nowrap', minWidth: 'fit-content', width: '100%'}}>
          
          {/* Objeto */}
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '10px', flex: '0 0 140px', display: 'flex', flexDirection: 'column'}}>
            <h3 style={{fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#fbbf24'}}>OBJETO</h3>
            <select value={selectedObject} onChange={(e) => setSelectedObject(e.target.value)} style={{width: '100%', padding: '4px 8px', backgroundColor: '#4b5563', borderRadius: '4px', fontSize: '11px', marginBottom: '8px', border: 'none', color: 'white'}}>
              {Object.entries(objects).map(([key, obj]) => (<option key={key} value={key}>{obj.name}</option>))}
            </select>
            <div style={{display: 'flex', flexDirection: 'column', gap: '4px', marginTop: 'auto'}}>
              <label style={{display: 'flex', alignItems: 'center', fontSize: '11px'}}><input type="checkbox" checked={showOriginal} onChange={(e) => setShowOriginal(e.target.checked)} style={{marginRight: '6px'}} />Original</label>
              <label style={{display: 'flex', alignItems: 'center', fontSize: '11px'}}><input type="checkbox" checked={showProjection} onChange={(e) => setShowProjection(e.target.checked)} style={{marginRight: '6px'}} />Projeção</label>
              <label style={{display: 'flex', alignItems: 'center', fontSize: '11px'}}><input type="checkbox" checked={showProjectionLines} onChange={(e) => setShowProjectionLines(e.target.checked)} style={{marginRight: '6px'}} />Raios</label>
            </div>
          </div>

          {/* Ponto de Vista */}
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '10px', flex: '1', minWidth: '220px'}}>
            <h3 style={{fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#fbbf24'}}>PONTO DE VISTA C=(a,b,c)</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '11px', width: '20px'}}>a:</span>
                <input type="range" min="-15" max="15" step="0.5" value={viewPoint.a} onChange={(e) => setViewPoint({...viewPoint, a: parseFloat(e.target.value)})} style={{flex: 1, height: '4px'}} />
                <span style={{fontSize: '11px', width: '35px', textAlign: 'right', backgroundColor: '#4b5563', padding: '2px 4px', borderRadius: '3px'}}>{viewPoint.a.toFixed(1)}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '11px', width: '20px'}}>b:</span>
                <input type="range" min="-15" max="15" step="0.5" value={viewPoint.b} onChange={(e) => setViewPoint({...viewPoint, b: parseFloat(e.target.value)})} style={{flex: 1, height: '4px'}} />
                <span style={{fontSize: '11px', width: '35px', textAlign: 'right', backgroundColor: '#4b5563', padding: '2px 4px', borderRadius: '3px'}}>{viewPoint.b.toFixed(1)}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '11px', width: '20px'}}>c:</span>
                <input type="range" min="-15" max="15" step="0.5" value={viewPoint.c} onChange={(e) => setViewPoint({...viewPoint, c: parseFloat(e.target.value)})} style={{flex: 1, height: '4px'}} />
                <span style={{fontSize: '11px', width: '35px', textAlign: 'right', backgroundColor: '#4b5563', padding: '2px 4px', borderRadius: '3px'}}>{viewPoint.c.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* P1 */}
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '10px', flex: '1', minWidth: '120px'}}>
            <h3 style={{fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#4ade80'}}>P1</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span style={{fontSize: '11px', width: '22px'}}>X1:</span>
                <input type="number" step="0.5" value={planePoints.p1.x} onChange={(e) => updatePlanePoint('p1', 'x', e.target.value)} style={{flex: 1, padding: '2px 4px', backgroundColor: '#4b5563', borderRadius: '3px', fontSize: '11px', border: 'none', color: 'white'}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span style={{fontSize: '11px', width: '22px'}}>Y1:</span>
                <input type="number" step="0.5" value={planePoints.p1.y} onChange={(e) => updatePlanePoint('p1', 'y', e.target.value)} style={{flex: 1, padding: '2px 4px', backgroundColor: '#4b5563', borderRadius: '3px', fontSize: '11px', border: 'none', color: 'white'}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span style={{fontSize: '11px', width: '22px'}}>Z1:</span>
                <input type="number" step="0.5" value={planePoints.p1.z} onChange={(e) => updatePlanePoint('p1', 'z', e.target.value)} style={{flex: 1, padding: '2px 4px', backgroundColor: '#4b5563', borderRadius: '3px', fontSize: '11px', border: 'none', color: 'white'}} />
              </div>
            </div>
          </div>

          {/* P2 */}
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '10px', flex: '1', minWidth: '120px'}}>
            <h3 style={{fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#4ade80'}}>P2</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span style={{fontSize: '11px', width: '22px'}}>X2:</span>
                <input type="number" step="0.5" value={planePoints.p2.x} onChange={(e) => updatePlanePoint('p2', 'x', e.target.value)} style={{flex: 1, padding: '2px 4px', backgroundColor: '#4b5563', borderRadius: '3px', fontSize: '11px', border: 'none', color: 'white'}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span style={{fontSize: '11px', width: '22px'}}>Y2:</span>
                <input type="number" step="0.5" value={planePoints.p2.y} onChange={(e) => updatePlanePoint('p2', 'y', e.target.value)} style={{flex: 1, padding: '2px 4px', backgroundColor: '#4b5563', borderRadius: '3px', fontSize: '11px', border: 'none', color: 'white'}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span style={{fontSize: '11px', width: '22px'}}>Z2:</span>
                <input type="number" step="0.5" value={planePoints.p2.z} onChange={(e) => updatePlanePoint('p2', 'z', e.target.value)} style={{flex: 1, padding: '2px 4px', backgroundColor: '#4b5563', borderRadius: '3px', fontSize: '11px', border: 'none', color: 'white'}} />
              </div>
            </div>
          </div>

          {/* P3 = R0 */}
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '10px', flex: '1', minWidth: '120px'}}>
            <h3 style={{fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#4ade80'}}>P3 = R0</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span style={{fontSize: '11px', width: '22px'}}>X3:</span>
                <input type="number" step="0.5" value={planePoints.p3.x} onChange={(e) => updatePlanePoint('p3', 'x', e.target.value)} style={{flex: 1, padding: '2px 4px', backgroundColor: '#4b5563', borderRadius: '3px', fontSize: '11px', border: 'none', color: 'white'}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span style={{fontSize: '11px', width: '22px'}}>Y3:</span>
                <input type="number" step="0.5" value={planePoints.p3.y} onChange={(e) => updatePlanePoint('p3', 'y', e.target.value)} style={{flex: 1, padding: '2px 4px', backgroundColor: '#4b5563', borderRadius: '3px', fontSize: '11px', border: 'none', color: 'white'}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span style={{fontSize: '11px', width: '22px'}}>Z3:</span>
                <input type="number" step="0.5" value={planePoints.p3.z} onChange={(e) => updatePlanePoint('p3', 'z', e.target.value)} style={{flex: 1, padding: '2px 4px', backgroundColor: '#4b5563', borderRadius: '3px', fontSize: '11px', border: 'none', color: 'white'}} />
              </div>
            </div>
          </div>

          {/* Legenda */}
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '10px', flex: '1', minWidth: '130px'}}>
            <h3 style={{fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#c084fc'}}>LEGENDA</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '11px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><span style={{width: '10px', height: '10px', backgroundColor: '#22d3ee', borderRadius: '2px', display: 'inline-block'}}></span>Original</div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><span style={{width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '2px', display: 'inline-block'}}></span>Projeção</div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><span style={{width: '10px', height: '10px', backgroundColor: '#22c55e', borderRadius: '2px', display: 'inline-block'}}></span>Plano</div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><span style={{width: '10px', height: '10px', backgroundColor: '#facc15', borderRadius: '2px', display: 'inline-block'}}></span>Vista</div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><span style={{width: '10px', height: '10px', backgroundColor: '#84cc16', borderRadius: '2px', display: 'inline-block'}}></span>P1,P2,P3</div>
            </div>
          </div>

          {/* Reset */}
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '10px', flex: '0 0 100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button 
              onClick={resetToDefaults}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                width: '100%'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              🔄 RESETAR
            </button>
          </div>

        </div>
      </div>

      {/* EXPLICAÇÃO */}
      <div style={{backgroundColor: '#0f172a', padding: '16px', borderTop: '2px solid #374151'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <h2 style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', color: '#fbbf24', textTransform: 'uppercase'}}>📚 Como Funciona a Projeção Perspectiva Cônica</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', fontSize: '12px', lineHeight: '1.6'}}>
            
            <div style={{backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #fbbf24'}}>
              <h3 style={{fontWeight: 'bold', marginBottom: '6px', color: '#fbbf24'}}>🎯 Ponto de Vista (C)</h3>
              <p style={{color: '#cbd5e1'}}>Define a posição do observador no espaço 3D através das coordenadas (a, b, c). É a partir deste ponto que os raios de projeção partem em direção aos vértices do objeto.</p>
            </div>

            <div style={{backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #4ade80'}}>
              <h3 style={{fontWeight: 'bold', marginBottom: '6px', color: '#4ade80'}}>📐 Plano de Projeção (P1, P2, P3)</h3>
              <p style={{color: '#cbd5e1'}}>Definido por três pontos não colineares. O ponto P3 também serve como origem (R0) do plano. A projeção dos objetos 3D é renderizada sobre este plano, formando a imagem 2D.</p>
            </div>

            <div style={{backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #22d3ee'}}>
              <h3 style={{fontWeight: 'bold', marginBottom: '6px', color: '#22d3ee'}}>🔷 Objeto Original</h3>
              <p style={{color: '#cbd5e1'}}>Representado em cyan, é o objeto 3D posicionado no espaço. Cada vértice do objeto possui coordenadas (x, y, z) que serão projetadas no plano.</p>
            </div>

            <div style={{backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #ef4444'}}>
              <h3 style={{fontWeight: 'bold', marginBottom: '6px', color: '#ef4444'}}>🔴 Projeção</h3>
              <p style={{color: '#cbd5e1'}}>Em vermelho, mostra o resultado da projeção perspectiva. Cada vértice do objeto original é projetado no plano através de raios que partem do ponto de vista.</p>
            </div>

            <div style={{backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #9ca3af'}}>
              <h3 style={{fontWeight: 'bold', marginBottom: '6px', color: '#9ca3af'}}>📏 Raios de Projeção</h3>
              <p style={{color: '#cbd5e1'}}>Linhas cinzas que conectam cada vértice do objeto ao ponto de vista. A interseção destes raios com o plano de projeção determina a posição dos pontos projetados.</p>
            </div>

            <div style={{backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #c084fc'}}>
              <h3 style={{fontWeight: 'bold', marginBottom: '6px', color: '#c084fc'}}>💡 Dica de Uso</h3>
              <p style={{color: '#cbd5e1'}}>Experimente mover o ponto de vista mais próximo ou mais longe do objeto. Quanto mais próximo, mais pronunciada é a perspectiva. Use o mouse para rotacionar a câmera na visualização 3D.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PerspectiveProjection;