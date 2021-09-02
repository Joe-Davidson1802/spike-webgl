import * as React from "react";

import * as THREE from "three";
import { SVGRenderer } from "three/examples/jsm/renderers/SVGRenderer";
import { useCamera, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Spinner, Flex, Heading, ChakraProvider } from "@chakra-ui/react";
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js";
import { zeroTheme } from "./themes";
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

function unselected() {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color("#48BB78"),
  });
}

function selected() {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color("#1C4532"),
  });
}

function Suzanne({ onClick }) {
  const ref = React.useRef();
  const { nodes } = useGLTF("/car.gltf", "/");

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
  console.log(edges);
  const redrawColours = () => {
    Object.values(nodes).forEach((v) => {
      if (v.type === "Mesh") {
        v.material = unselected();
      }
    });
  };
  React.useEffect(redrawColours, [nodes]);

  return (
    <group dispose={null}>
      <primitive
        ref={ref}
        object={nodes.root}
        position={[0, 0, 0]}
        //rotation={[-1.3, 0, -0.02]}
        onClick={(event) => {
          event.stopPropagation();
          redrawColours();
          event.object.material = selected();
          console.log(event);

          onClick(event.object.name);
        }}
      ></primitive>
      {edges.map((e) => (
        <primitive key={e.uuid} object={e} renderOrder={100}></primitive>
      ))}
    </group>
  );
}
function Scene({ callback }) {
  const ctrl = React.useRef();
  return (
    <>
      <ambientLight intensity={1} />
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

const NavBar = () => {
  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        w="100vw"
        align="center"
        p={{ base: "10px", md: "20px" }}
        id="nav-bar"
      >
        <Heading
          // as="h1"
          id="aviva-zero-heading"
          transition="0.7s"
          className="logo"
          // fontSize={history.location.pathname === "/" ? { base: "80px", sm: "100px", md: "120px", lg: "140px" } : { base: "50px", sm: "60px", md: "70px", lg: "80px" }}
          fontWeight="900"
          lineHeight="0.6em"
          variant="insurance-price"
          // mt={history.location.pathname === "/" ? { base: "10px", sm: "20px", md: "30px", lg: "40px" } : { base: "0px", sm: "0px", md: "0px", lg: "0px" }}
        >
          zero
        </Heading>
      </Flex>
    </>
  );
};

function App() {
  const [m, setM] = React.useState("");

  return (
    <ChakraProvider theme={zeroTheme}>
      <NavBar />
      <Canvas pixelRatio={[1, 1]} camera={{ position: [0, 1, 4] }}>
        <React.Suspense fallback={null}>
          <Scene callback={setM} />
        </React.Suspense>
      </Canvas>
      {`Last clicked: ${m}`}
    </ChakraProvider>
  );
}

export default App;
