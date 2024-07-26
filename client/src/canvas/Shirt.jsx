import React, { useEffect, useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture, Text } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked_new.glb");

  const logoTextureFront = useTexture(snap.logoDecalFront);
  const logoTextureBack = useTexture(snap.logoDecalBack);
  const boxTextureFront = useTexture(snap.boxDecalFront);
  const boxTextureBack = useTexture(snap.boxDecalBack);
  const smallLogoTextureFront = useTexture(snap.smallLogoDecalFront);

  // Reference for the shirt mesh
  const shirtRef = useRef();
  const rotationRef = useRef({ x: 0, y: 0 });

  // Apply easing color change
  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);

    // Apply the accumulated rotation from dragging
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

  useEffect(() => {
    rotationRef.current.y = snap.size;
  }, [state.size]);

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString} ref={shirtRef} {...bind()}>
      <mesh
        // castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* Front A4 */}
        {snap.isLogoTextureFront && (
          <Decal
            position={[0, 0, 0.1]}
            rotation={[0, 0, 0]}
            scale={[0.25, 0.25, 0.2]}
            map={logoTextureFront}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {/* Back A4 */}
        {snap.isLogoTextureBack && (
          <Decal
            position={[0, 0, -0.1]} // [,height,depth]
            rotation={[0, 0, 0]}
            scale={[-0.25, 0.25, 0.2]}
            map={logoTextureBack}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {/* Front Box */}
        {snap.isBoxTextureFront && (
          <Decal
            position={[0, 0.09, 0.1]}
            rotation={[0, 0, 0]}
            scale={[0.25, 0.1, 0.1]}
            map={boxTextureFront}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {/* Back Box */}
        {snap.isBoxTextureBack && (
          <Decal
            position={[0, 0.09, -0.1]}
            rotation={[0, 0, 0]}
            scale={[-0.25, 0.1, 0.1]}
            map={boxTextureBack}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {/* front logo */}
        {snap.isSmallLogoTextureFront && (
          <Decal
            position={[0.1, 0.13, 0.1]}
            rotation={[0, 0, 0]}
            scale={[0.05, 0.05, 0.1]}
            map={smallLogoTextureFront}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {/* <meshStandardMaterial color="orange" /> */}
      </mesh>

      {/* <boxGeometry args={[1, 1, 1]} /> */}
    </group>
  );
};

export default Shirt;
