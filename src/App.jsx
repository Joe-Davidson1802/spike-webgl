import * as React from "react";
import { Mesh, Vector3 } from "three";

import { TransformControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export const OrbitControls = React.forwardRef(
  (
    {
      makeDefault,
      camera,
      regress,
      domElement,
      enableDamping = true,
      onChange,
      onStart,
      onEnd,
      ...restProps
    },
    ref
  ) => {
    const invalidate = useThree(({ invalidate }) => invalidate);
    const defaultCamera = useThree(({ camera }) => camera);
    const gl = useThree(({ gl }) => gl);
    const set = useThree(({ set }) => set);
    const get = useThree(({ get }) => get);
    const performance = useThree(({ performance }) => performance);
    const explCamera = camera || defaultCamera;
    const explDomElement = domElement || gl.domElement;
    const controls = React.useMemo(
      () => new OrbitControlsImpl(explCamera),
      [explCamera]
    );

    useFrame(() => {
      if (controls.enabled) controls.update();
    });

    React.useEffect(() => {
      const callback = (e) => {
        invalidate();
        if (regress) performance.regress();
        if (onChange) onChange(e);
      };

      controls.connect(explDomElement);
      controls.addEventListener("change", callback);

      if (onStart) controls.addEventListener("start", onStart);
      if (onEnd) controls.addEventListener("end", onEnd);

      return () => {
        controls.removeEventListener("change", callback);
        if (onStart) controls.removeEventListener("start", onStart);
        if (onEnd) controls.removeEventListener("end", onEnd);
        controls.dispose();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onChange, onStart, onEnd, regress, controls, invalidate]);

    React.useEffect(() => {
      if (makeDefault) {
        // @ts-expect-error new in @react-three/fiber@7.0.5
        const old = get().controls;
        // @ts-expect-error new in @react-three/fiber@7.0.5
        set({ controls });
        // @ts-expect-error new in @react-three/fiber@7.0.5
        return () => set({ controls: old });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [makeDefault, controls]);

    return (
      <primitive
        ref={ref}
        object={controls}
        enableDamping={enableDamping}
        {...restProps}
      />
    );
  }
);

function Suzanne({ onClick }) {
  const ref = React.useRef();
  const { nodes } = useGLTF("/scene.gltf", "/");
  console.log(nodes);
  return (
    <mesh
      ref={ref}
      geometry={nodes.Suzanne_1.geometry}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      onClick={() => (ref.current.rotation.z += 0.1)}
    >
      <meshStandardMaterial color="#ff0000" opacity={1} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas pixelRatio={[1, 4]} camera={{ position: [1, 2, 1], fov: 50 }}>
      <React.Suspense fallback={null}>
        <pointLight intensity={1} position={[0, 2, 0]} />
        <Suzanne />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
        />
      </React.Suspense>
    </Canvas>
  );
}

export default App;
