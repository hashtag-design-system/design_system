import { chakra, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { StrengthBoxesType } from "../../Password";

const MotionFlex = motion(Flex);

export type PasswordBoxesProps = {
  isFocused?: boolean;
  strengthBoxes: StrengthBoxesType;
};

export const PasswordBoxes: React.FunctionComponent<PasswordBoxesProps> = ({ strengthBoxes, isFocused }) => {
  return (
    <MotionFlex
      flexDirection="row"
      justifyContent="flex-end"
      gridGap={1}
      marginLeft="auto"
      marginBottom={1}
      initial={false}
      animate={{ opacity: isFocused ? 0.75 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {strengthBoxes.map((level, i) => {
        let firstColor: string, secondColor: string;
        switch (level) {
          case "sm":
            firstColor = "orange.300";
            secondColor = "red.500";
            break;
          case "md":
            firstColor = "orange.400";
            secondColor = "yellow.400";
            break;
          case "lg":
            firstColor = "green.300";
            secondColor = "green.400";
            break;
        }
        return (
          <chakra.span
            key={"password_strength_box_" + i}
            height={2.5}
            width={2.5}
            alignSelf="flex-end"
            borderRadius="sm"
            bgGradient={`linear(48deg, ${firstColor} 0%, ${secondColor} 55%)`}
          />
        );
      })}
    </MotionFlex>
  );
};
