import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Environment, Lightformer, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { ShowcaseProject } from './projects';

const SMOOTH = 0.16; // lerp factor toward the scroll target

interface SceneProps {
  items: ShowcaseProject[];
  progress: MutableRefObject<number>;
  isMobile: boolean;
}

/** One helical strand of the DNA, wound around the Y axis. */
function strandGeometry(
  height: number,
  r: number,
  k: number,
  phase: number,
  segs: number
) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segs; i++) {
    const y = -height / 2 + height * (i / segs);
    const a = k * y + phase;
    pts.push(new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)));
  }
  return new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(pts),
    segs,
    0.035,
    6,
    false
  );
}

/**
 * A subtle DNA double-helix running through the pillar — two two-toned strands
 * with rungs, chaining the sites together as the spiral turns.
 */
function Dna({
  height,
  vStep,
  isMobile,
}: {
  height: number;
  vStep: number;
  isMobile: boolean;
}) {
  const r = 1.05;
  const k = (2 * Math.PI) / (2.4 * vStep); // gentle pitch (~2 turns on screen)
  const segs = isMobile ? 120 : 220;

  const strandA = useMemo(
    () => strandGeometry(height, r, k, 0, segs),
    [height, k, segs]
  );
  const strandB = useMemo(
    () => strandGeometry(height, r, k, Math.PI, segs),
    [height, k, segs]
  );

  const rungs = useMemo(() => {
    const spacing = isMobile ? 1.3 : 0.95;
    const count = Math.floor(height / spacing);
    const up = new THREE.Vector3(0, 1, 0);
    return Array.from({ length: count + 1 }, (_, i) => {
      const y = -height / 2 + i * spacing;
      const a = k * y;
      const p0 = new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a));
      const p1 = new THREE.Vector3(-r * Math.cos(a), y, -r * Math.sin(a));
      const mid = p0.clone().add(p1).multiplyScalar(0.5);
      const dir = p1.clone().sub(p0);
      const len = dir.length();
      const q = new THREE.Quaternion().setFromUnitVectors(
        up,
        dir.normalize()
      );
      return { mid, len, q, key: i };
    });
  }, [height, k, isMobile]);

  return (
    <group>
      <mesh geometry={strandA}>
        <meshStandardMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={0.9}
          metalness={0.5}
          roughness={0.35}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={strandB}>
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
          metalness={0.5}
          roughness={0.35}
          toneMapped={false}
        />
      </mesh>
      {rungs.map((d) => (
        <mesh key={d.key} position={d.mid} quaternion={d.q}>
          <cylinderGeometry args={[0.02, 0.02, d.len, 5]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#2dd4bf"
            emissiveIntensity={0.45}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** The central hexagonal pillar the sites orbit around. */
function HexCore({ height }: { height: number }) {
  return (
    <mesh>
      {/* radialSegments = 6 -> hexagonal cross-section */}
      <cylinderGeometry args={[0.62, 0.62, height, 6, 1]} />
      <meshStandardMaterial
        color="#0b1714"
        metalness={0.95}
        roughness={0.22}
        envMapIntensity={1.6}
        emissive="#062019"
        emissiveIntensity={0.4}
      />
      <Edges threshold={1} color="#34d399" />
    </mesh>
  );
}

/** A site mounted on one side of the pillar. */
function SitePanel({
  texture,
  w,
  h,
}: {
  texture: THREE.Texture;
  w: number;
  h: number;
}) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[w, h, 0.14]} />
        <meshStandardMaterial
          color="#0a1714"
          metalness={0.9}
          roughness={0.26}
          envMapIntensity={1.3}
        />
        <Edges threshold={1} color="#34d399" />
      </mesh>
      <mesh position={[0, 0, 0.078]}>
        <planeGeometry args={[w * 0.92, h * 0.84]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive={'#ffffff'}
          emissiveIntensity={0.5}
          toneMapped={false}
          roughness={0.5}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

function Spire({ items, progress, isMobile }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const state = useRef({ rot: 0, pos: 0 });
  const n = items.length;

  const stepAngle = (2 * Math.PI) / n; // hexagonal spacing
  // Enough vertical rise that consecutive panels never overlap.
  const vStep = isMobile ? 2.3 : 2.7;
  const R = isMobile ? 2.5 : 2.8; // radius from axis to a site
  const w = isMobile ? 3.0 : 3.6;
  const h = w / 1.92;

  const height = n * vStep + 18;

  const textures = useTexture(items.map((i) => i.image));
  useMemo(() => {
    (textures as THREE.Texture[]).forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);

  const layout = useMemo(
    () =>
      items.map((_, i) => {
        const a = i * stepAngle;
        const y = -i * vStep;
        return {
          a,
          pos: [R * Math.sin(a), y, R * Math.cos(a)] as [
            number,
            number,
            number,
          ],
        };
      }),
    [items, stepAngle, vStep, R]
  );

  // Lift the focused panel up on mobile so it clears the bottom text zone.
  const focusY = isMobile ? 1.0 : 0;

  useFrame(() => {
    const p = progress.current;
    const targetRot = -p * (n - 1) * stepAngle;
    const targetPos = p * (n - 1) * vStep + focusY;
    state.current.rot += (targetRot - state.current.rot) * SMOOTH;
    state.current.pos += (targetPos - state.current.pos) * SMOOTH;
    if (group.current) {
      group.current.rotation.y = state.current.rot;
      group.current.position.y = state.current.pos;
    }
  });

  return (
    <group ref={group}>
      <HexCore height={height} />
      <Dna height={height} vStep={vStep} isMobile={isMobile} />

      {layout.map((l, i) => (
        <group key={items[i].name} position={l.pos} rotation={[0, l.a, 0]}>
          <SitePanel texture={(textures as THREE.Texture[])[i]} w={w} h={h} />
        </group>
      ))}
    </group>
  );
}

export default function ShowcaseScene({ items, progress, isMobile }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 5, 6]} intensity={70} decay={2} color="#34d399" />
      <pointLight position={[-7, -3, 4]} intensity={55} decay={2} color="#22d3ee" />
      <pointLight position={[0, 0, 5]} intensity={26} decay={2} color="#ffffff" />

      <Environment resolution={isMobile ? 128 : 256} frames={1}>
        <Lightformer
          form="rect"
          intensity={3}
          color="#34d399"
          position={[-5, 3, 4]}
          scale={[7, 7, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#22d3ee"
          position={[5, -2, 3]}
          scale={[7, 7, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#ffffff"
          position={[0, 5, -5]}
          scale={[9, 3, 1]}
        />
      </Environment>

      <Spire items={items} progress={progress} isMobile={isMobile} />
    </>
  );
}
