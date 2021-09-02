import * as React from "react";

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Flex, Heading, ChakraProvider } from "@chakra-ui/react";
import { zeroTheme } from "./themes";

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
      controls.minPolarAngle = controls.getPolarAngle();
      controls.maxPolarAngle = controls.getPolarAngle();

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

function unselectedMaterial() {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color("#48BB78"),
  });
}

function selectedMaterial() {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color("#1C4532"),
  });
}

function Vehicle({ onChange }) {
  const ref = React.useRef();
  const { nodes } = useGLTF("/car.gltf", "/");
  const [selected, setSelected] = React.useState([]);

  const edges = React.useMemo(
    () =>
      Object.values(nodes)
        .filter((n) => n.type === "Mesh")
        .map((n) => {
          const e = new THREE.EdgesGeometry(n.geometry, 15);
          console.log(e);
          const l = new THREE.LineSegments(
            e,
            new THREE.LineBasicMaterial({ color: new THREE.Color("#1C4532") })
          );
          var pos = new THREE.Vector3();
          var scale = new THREE.Vector3();
          var rot = new THREE.Quaternion();
          n.getWorldPosition(pos);
          n.getWorldQuaternion(rot);
          n.getWorldScale(scale);
          l.position.copy(pos);
          l.scale.copy(scale);
          l.quaternion.copy(rot);
          return l;
        }),
    [nodes]
  );
  const redrawColours = () => {
    Object.values(nodes).forEach((v) => {
      if (v.type === "Mesh") {
        const isSelected = selected.includes(v.name);
        v.material = isSelected ? selectedMaterial() : unselectedMaterial();
      }
    });
  };
  React.useEffect(redrawColours, [selected]);

  const toggleSelected = (name) => {
    if (selected.includes(name)) {
      const newList = selected.filter((x) => x !== name);
      setSelected(newList);
      onChange({
        deselected: name,
        currentlySelected: newList,
      });
    } else {
      const newList = [...selected, name];
      setSelected(newList);
      onChange({
        selected: name,
        currentlySelected: newList,
      });
    }
  };

  return (
    <group dispose={null}>
      <primitive
        ref={ref}
        object={nodes.root}
        position={[0, 0, 0]}
        onClick={(event) => {
          if (event.delta > 10) return;
          event.stopPropagation();
          console.log(event);
          toggleSelected(event.object.name);
        }}
      ></primitive>
      {edges.map((e) => (
        <primitive key={e.uuid} object={e} renderOrder={100}></primitive>
      ))}
    </group>
  );
}
function Scene({ onChange }) {
  const ctrl = React.useRef();
  return (
    <>
      <ambientLight intensity={1} />
      <Vehicle onChange={onChange} />

      <OrbitControls
        ref={ctrl}
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
      />
    </>
  );
}

export default ({ onChange, ...props }) => {
  return (
    <div {...props}>
      <Canvas pixelRatio={[1, 1]} camera={{ position: [0, 1.5, 3] }}>
        <React.Suspense fallback={null}>
          <Scene onChange={onChange} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};
