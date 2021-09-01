import * as React from "react";

import * as THREE from "three";
import { useCamera, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
const getRanHex = (size) => {
  let result = [];
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join("");
};

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
      controls.minPolarAngle = controls.getPolarAngle()
      controls.maxPolarAngle = controls.getPolarAngle()

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
  const { nodes, materials } = useGLTF("/scene.gltf", "/");
  console.log(nodes);
  Object.values(nodes).forEach((v) => {
    if (v.type === "Mesh") {
      const BasicMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#" + getRanHex(6)),
      });

      v.material = BasicMaterial;
    }
  });
  return (
    <primitive
      ref={ref}
      object={nodes.Car_Rig_68}
      position={[0, 0, -1]}
      //rotation={[-1.3, 0, -0.02]}
      onClick={(event) => onClick(event.object.parent.name)}
    ></primitive>
  );
}
function Scene({ callback }) {
  const ctrl = React.useRef();
  console.log(ctrl)
  return (
    <>
      <pointLight intensity={1} position={[3, 4, 1]} />
      <Suzanne onClick={callback} />

      <OrbitControls
        ref={ctrl}
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
      />
    </>
  );
}

function App() {
  const [m, setM] = React.useState("");

  return (
    <>
      <Canvas pixelRatio={[1, 1]} camera={{ position: [0, 1, 4] }}>
        <React.Suspense fallback={null}>
          <Scene callback={setM} />
        </React.Suspense>
      </Canvas>
      {`Last clicked: ${m}`}
    </>
  );
}

export default App;
