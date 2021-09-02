import * as React from "react";

import { Flex, Heading, ChakraProvider } from "@chakra-ui/react";
import { zeroTheme } from "./themes";
import DamageCapture3D from "./DamageCapture3D.js"

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
      <DamageCapture3D
        onChange={setM}
        style={{ position: "relative", width: "100%", height: 900 }}
      />
      {`Last clicked: ${JSON.stringify(m)}`}
    </ChakraProvider>
  );
}

export default App;
