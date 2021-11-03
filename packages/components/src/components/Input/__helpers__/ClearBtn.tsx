import { InputRightElement } from "@chakra-ui/react";
import { Icon, SmallCloseIcon } from "@chakra-ui/icons";
import { InputProps } from "../index";

export type ClearBtnProps = Pick<InputProps, "hasClearBtn"> & {
  atTextArea?: boolean;
  _internalValue: string;
  handleClear: () => void;
};

export const ClearBtn: React.FC<ClearBtnProps> = ({ hasClearBtn, _internalValue, atTextArea = false, handleClear }) => {
  return hasClearBtn ? (
    <InputRightElement
      className="input__clear-btn"
      width={atTextArea ? 6 : undefined}
      height={atTextArea ? 10 : undefined}
      marginRight={atTextArea ? 2 : undefined}
    >
      {_internalValue.length !== 0 && (
        <SmallCloseIcon
          // width={6}
          // width="1.25em"
          // height="1.25em"
          // height={6}
          borderRadius="full"
          padding={1}
          bg="gray.100"
          color="gray.600"
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
          onClick={handleClear}
        />
      )}
    </InputRightElement>
  ) : null;
};

ClearBtn.displayName = "InputClearBtn";
