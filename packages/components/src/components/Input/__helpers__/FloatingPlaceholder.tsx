import { FormLabel as ChakraFormLabel, FormLabelProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { InputProps } from "../index";

export const MotionLabel = motion<FormLabelProps>(ChakraFormLabel);

export type FloatingPlaceholderProps = {
  isFocused: boolean;
  _internalValue: string;
  hasAlreadyLabel: boolean;
  offsetLeft: number;
  defaultPaddingX: number;
  paddingLeft: number;
  paddingTop?: number;
  atTextArea?: boolean;
  borderTopWidth?: number;
} & Pick<InputProps, "placeholder" | "hasFloatingPlaceholder">;

export const FloatingPlaceholder: React.FC<FloatingPlaceholderProps> = ({
  _internalValue,
  placeholder,
  hasFloatingPlaceholder = (placeholder?.length || 0) !== 0,
  isFocused = false,
  hasAlreadyLabel = false,
  paddingLeft = 0,
  offsetLeft = 0,
  defaultPaddingX,
  paddingTop = 0,
  atTextArea = false,
}) => {
  return !hasFloatingPlaceholder ? null : (
    <MotionLabel
      requiredIndicator={<></>}
      as={hasAlreadyLabel ? "span" : "label"}
      initial={false}
      animate={
        isFocused || _internalValue.length !== 0
          ? { top: atTextArea ? paddingTop - paddingTop * 0.9 + "rem" : "20%", scale: 0.625 }
          : { top: atTextArea ? paddingTop + "rem" : "50%", scale: 1 }
      }
      position="absolute"
      margin={0}
      transformOrigin="left"
      zIndex={atTextArea ? 2 : undefined}
      pointerEvents="none"
      fontSize="sm"
      color="gray.500"
      fontWeight="normal"
      minHeight={3}
      style={{
        left: (paddingLeft / 16 || +(defaultPaddingX || 0).toString()) + offsetLeft / 16 + "rem",
        translateY: !atTextArea ? "-50%" : undefined,
      }}
    >
      {placeholder}
    </MotionLabel>
  );
};

FloatingPlaceholder.displayName = "InputFloatingPlaceholder";
