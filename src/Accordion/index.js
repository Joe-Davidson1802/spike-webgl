import {
  Select,
  Accordion as CAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Icon,
} from "@chakra-ui/react";
import { BiCheckShield } from "react-icons/bi";
import * as React from "react";
import { IconType } from "react-icons";

import {
  accordionButtonText,
  accordionIcon,
  accordionArrow,
} from "./Accordion.module.css";

const renderItem = ({ title, contents, icon }) => (
  <AccordionItem>
    <h2>
      <AccordionButton className={accordionButtonText}>
        <Icon as={icon} boxSize={6} className={accordionIcon} />
        <Box flex="1" textAlign="left">
          {title}
        </Box>
        <AccordionIcon boxSize={6} className={accordionArrow} />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>{contents}</AccordionPanel>
  </AccordionItem>
);

const Accordion = ({ options }) => {
  return (
    <CAccordion allowToggle>{options.map((opt) => renderItem(opt))}</CAccordion>
  );
};

export default Accordion;
