import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Edges,
  Environment,
  Lightformer,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import type { ShowcaseProject } from './projects';

const SPACING = 3.15; // vertical gap between block centres
const STEP = Math.PI * 0.9; // rotation between consecutive blocks
const SMOOTH = 0.12; // lerp factor toward the scroll target

interface SceneProps {
  items: ShowcaseProject[];
  progress: MutableRefObject<number>;
  isMobile: boolean;
}

/** A single block: a metallic slab with the site screenshot inset as a screen. */
function Block({
  texture,
  w,
  h,
  d,
}: {
  texture: THREE.Texture;
  w: number;
  h: number;
  d: number;
}) {
  return (
    <group>
      {/* Body — dark metallic, reflects the coloured environment */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color="#0a1714"
          metalness={0.92}
          roughness={0.26}
          envMapIntensity={1.4}
        />
        {/* Glowing wireframe edges — the "blockchain" tech read */}
        <Edges threshold={1} color="#34d399" />
      </mesh>

      {/* Screen — the actual website, emissive so it reads in the dark scene */}
      <mesh position={[0, 0, d / 2 + 0.012]}>
        <planeGeometry args={[w * 0.9, h * 0.82]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive={'#ffffff'}
          emissiveIntensity={0.42}
          toneMapped={false}
          roughness={0.5}
          metalness={0}
        />
      </mesh>

      {/* Thin emerald frame around the screen */}
      <mesh position={[0, 0, d / 2 + 0.006]}>
        <planeGeometry args={[w * 0.94, h * 0.86]} />
        <meshBasicMaterial color="#0c1d18" toneMapped={false} />
      </mesh>
    </group>
  );
}

/** A glowing link + node sitting between two blocks. */
function Link({ y, gap }: { y: number; gap: number }) {
  const node = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (node.current) node.current.rotation.y += dt * 0.6;
  });
  return (
    <group position={[0, y, 0]}>
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, gap, 10]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={node}>
        <icosahedronGeometry args={[0.17, 0]} />
        <meshStandardMaterial
          color="#5eead4"
          emissive="#5eead4"
          emissiveIntensity={1.8}
          toneMapped={false}
          wireframe
        />
      </mesh>
    </group>
  );
}

function Spine({ items, progress, isMobile }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const state = useRef({ rot: 0, pos: 0 });
  const n = items.length;

  const w = isMobile ? 3.1 : 4.3;
  const h = w / 1.92; // match the screenshot aspect ratio
  const d = 0.34;
  const gap = SPACING - h; // bare link length between blocks

  const textures = useTexture(items.map((i) => i.image));
  useMemo(() => {
    (textures as THREE.Texture[]).forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);

  useFrame(() => {
    const p = progress.current;
    const targetRot = -p * (n - 1) * STEP;
    const targetPos = p * (n - 1) * SPACING;
    state.current.rot += (targetRot - state.current.rot) * SMOOTH;
    state.current.pos += (targetPos - state.current.pos) * SMOOTH;
    if (group.current) {
      group.current.rotation.y = state.current.rot;
      group.current.position.y = state.current.pos;
    }
  });

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <group
          key={item.name}
          position={[0, -i * SPACING, 0]}
          rotation={[0, i * STEP, 0]}
        >
          <Block texture={(textures as THREE.Texture[])[i]} w={w} h={h} d={d} />
        </group>
      ))}

      {items.slice(0, -1).map((item, i) => (
        <Link key={`link-${item.name}`} y={-i * SPACING - SPACING / 2} gap={gap} />
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

      {/* Local environment (no network fetch) for metallic reflections */}
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

      <Spine items={items} progress={progress} isMobile={isMobile} />
    </>
  );
}
