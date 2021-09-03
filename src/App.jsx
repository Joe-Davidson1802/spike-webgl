import * as React from "react";

import {
  Flex,
  SimpleGrid,
  Box,
  Heading,
  Container,
  ChakraProvider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Table,
  Td,
  Tr,
  Tbody,
} from "@chakra-ui/react";
import { zeroTheme } from "./themes";
import DamageCapture3D from "./DamageCapture3D.js";
import Accordion from "./Accordion";
import { BiQuestionMark } from "react-icons/bi";

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

function friendlyName(ugly) {
  switch (ugly) {
    case "window_f":
      return "Windscreen";
    case "hood":
      return "Bonnet";
    case "door_fr":
      return "Door (front driver-side)";
    case "door_rr":
      return "Door (rear driver-side)";
    case "door_fl":
      return "Door (front passenger-side)";
    case "door_rl":
      return "Door (rear passenger-side)";
    case "wheel_fr":
      return "Wheel (front driver-side)";
    case "wheel_rr":
      return "Wheel (rear driver-side)";
    case "wheel_fl":
      return "Wheel (front passenger-side)";
    case "wheel_rl":
      return "Wheel (rear passenger-side)";
    case "window_fr":
      return "Window (front driver-side)";
    case "window_rr":
      return "Window (rear driver-side)";
    case "window_fl":
      return "Window (front passenger-side)";
    case "window_rl":
      return "Window (rear passenger-side)";
    case "body":
      return "Body";
    case "bumper_front":
      return "Front Bumper";
    case "bumper_rear":
      return "Rear Bumper";
    case "headlights_fr":
      return "Headlight (driver-side)";
    case "headlights_fl":
      return "Headlight (passenger-side)";
    case "mirror_r":
      return "Mirror (driver-side)";
    case "mirror_l":
      return "Mirror (passenger-side)";
    case "door_rear":
      return "Door (rear boot)";
    case "window_r":
      return "Rear Window";
  }
  return ugly;
}
function damageOptions() {
  return [
    (<span>Scratch</span>),
    (<span>Scrape</span>),
    (<span>Dent</span>),
    (<span>Detached</span>),
  ]

}

function getOptions(state) {
  return state?.currentlySelected.map((part) => ({
    title: friendlyName(part),
    icon: BiQuestionMark,
    contents: (
      <>
      <div padding="30px" margin="30px">
      <Slider style={{ width: "100%", marginLeft:"30px", marginRight:"30px" }} defaultValue={0} min={0} max={damageOptions().length-1}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      </div>
      <SimpleGrid columns={damageOptions().length} marginTop="15px" spacing={2}>
        {damageOptions().map(opt => <Box style={{textAlign: "center"}}>{opt}</Box>)}
      </SimpleGrid>
      </>
    ),
  }));
}

function App() {
  const [m, setM] = React.useState(null);

  return (
    <ChakraProvider theme={zeroTheme}>
      <NavBar />
      <DamageCapture3D
        onChange={setM}
        style={{ position: "relative", height: "50vh" }}
      />
      <Container>
        {m?.currentlySelected ? <Accordion options={getOptions(m)} /> : ""}
      </Container>
    </ChakraProvider>
  );
}

export default App;
