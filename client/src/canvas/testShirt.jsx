import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Decal,
  PerspectiveCamera,
} from "@react-three/drei";
import { useSnapshot } from "valtio";
import { useDrag } from "@use-gesture/react";
import state from "../store"; // Assuming you have a Valtio store

const TestShirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/tshirt.glb");
  console.log(nodes, materials);
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const shirtRef = useRef();
  const rotationRef = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Apply easing color change
    materials.Material1718.color.set(snap.color);
    if (shirtRef.current) {
      shirtRef.current.rotation.x = rotationRef.current.x;
      shirtRef.current.rotation.y = rotationRef.current.y;
    }
  });

  // Handle drag events to update rotation
  const bind = useDrag(({ movement: [mx, my] }) => {
    rotationRef.current.y = mx * 0.01;
    // rotationRef.current.x = my * 0.01;
  });

  const stateString = JSON.stringify(snap);

  return (
    <PerspectiveCamera>
      <group key={stateString} ref={shirtRef} {...bind()} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.041}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.041}>
            <mesh
              geometry={nodes.Material1718.geometry}
              material={materials.Material1718}
            />
            <mesh
              geometry={nodes.Material1722.geometry}
              material={materials.Material1722}
            />
            <mesh
              geometry={nodes.Material1724.geometry}
              material={materials.Material1724}
            />
            <mesh
              geometry={nodes.Material1720.geometry}
              material={materials.Infinite_Light_1}
            />
          </group>
        </group>
      </group>
    </PerspectiveCamera>
  );
};

export default TestShirt;
