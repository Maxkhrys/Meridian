import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Environment, Lightformer, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { ShowcaseProject } from './projects';

const SMOOTH = 0.12; // lerp factor toward the scroll target

interface SceneProps {
  items: ShowcaseProject[];
  progress: MutableRefObject<number>;
  isMobile: boolean;
}

/** Twist a geometry around the Y axis, proportional to each vertex's height. */
function twist(geo: THREE.BufferGeometry, rate: number) {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const a = v.y * rate;
    const c = Math.cos(a);
    const s = Math.sin(a);
    pos.setXYZ(i, v.x * c - v.z * s, v.y, v.x * s + v.z * c);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/** A single helical rail tube following one edge of the twisted hex core. */
function helixTube(
  phi: number,
  r: number,
  height: number,
  rate: number,
  segs: number
) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segs; i++) {
    const y = -height / 2 + height * (i / segs);
    const a = phi + y * rate;
    pts.push(new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  return new THREE.TubeGeometry(curve, segs, 0.045, 6, false);
}

/** The central extruded-spiral hexagonal pillar. */
function HexCore({
  height,
  rate,
  isMobile,
}: {
  height: number;
  rate: number;
  isMobile: boolean;
}) {
  const r = 0.62;
  const segs = isMobile ? 80 : 140;

  const body = useMemo(() => {
    const g = new THREE.CylinderGeometry(r, r, height, 6, segs, true);
    return twist(g, rate);
  }, [height, rate, segs]);

  const rails = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) =>
        helixTube((i * Math.PI) / 3, r, height, rate, segs)
      ),
    [height, rate, segs]
  );

  return (
    <group>
      <mesh geometry={body}>
        <meshStandardMaterial
          color="#091512"
          metalness={0.95}
          roughness={0.22}
          envMapIntensity={1.5}
        />
      </mesh>
      {rails.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={1.5}
            metalness={0.6}
            roughness={0.3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Interlocking chain links between two local points. */
function Chain({
  start,
  end,
  links,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  links: number;
}) {
  const data = useMemo(() => {
    const dir = end.clone().sub(start);
    const len = dir.length();
    const step = len / links;
    const dirN = dir.clone().normalize();
    const base = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      dirN
    );
    return Array.from({ length: links }, (_, i) => {
      const p = start
        .clone()
        .add(dirN.clone().multiplyScalar(step * (i + 0.5)));
      const roll = new THREE.Quaternion().setFromAxisAngle(
        dirN,
        (i % 2) * (Math.PI / 2)
      );
      const q = roll.clone().multiply(base);
      return { p, q, ring: step * 0.58, tube: step * 0.16 };
    });
  }, [start, end, links]);

  return (
    <group>
      {data.map((d, i) => (
        <mesh key={i} position={d.p} quaternion={d.q}>
          <torusGeometry args={[d.ring, d.tube, 6, 14]} />
          <meshStandardMaterial
            color="#5eead4"
            emissive="#2dd4bf"
            emissiveIntensity={0.7}
            metalness={0.85}
            roughness={0.3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
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
          emissiveIntensity={0.45}
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
  const vStep = isMobile ? 1.15 : 1.35; // vertical rise per site (the spiral)
  const R = isMobile ? 2.45 : 2.75; // radius from axis to a site
  const w = isMobile ? 3.0 : 3.7;
  const h = w / 1.92;
  const rCore = 0.5;

  const height = n * vStep + 18;
  const rate = (3 * 2 * Math.PI) / height; // ~3 turns of twist

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
        const sin = Math.sin(a);
        const cos = Math.cos(a);
        return {
          a,
          pos: [R * sin, y, R * cos] as [number, number, number],
          // chain hangs from the core (higher, inner) to the panel top
          A: new THREE.Vector3(rCore * sin, y + h / 2 + 0.75, rCore * cos),
          B: new THREE.Vector3(R * 0.94 * sin, y + h / 2 - 0.05, R * 0.94 * cos),
        };
      }),
    [items, stepAngle, vStep, R, h]
  );

  useFrame(() => {
    const p = progress.current;
    const targetRot = -p * (n - 1) * stepAngle;
    const targetPos = p * (n - 1) * vStep;
    state.current.rot += (targetRot - state.current.rot) * SMOOTH;
    state.current.pos += (targetPos - state.current.pos) * SMOOTH;
    if (group.current) {
      group.current.rotation.y = state.current.rot;
      group.current.position.y = state.current.pos;
    }
  });

  return (
    <group ref={group}>
      <HexCore height={height} rate={rate} isMobile={isMobile} />

      {layout.map((l, i) => (
        <group key={items[i].name}>
          <group position={l.pos} rotation={[0, l.a, 0]}>
            <SitePanel texture={(textures as THREE.Texture[])[i]} w={w} h={h} />
          </group>
          <Chain start={l.A} end={l.B} links={isMobile ? 3 : 4} />
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
