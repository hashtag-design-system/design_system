import {
  chakra,
  forwardRef,
  Textarea as ChakraTextarea,
  TextareaProps,
  useColorModeValue,
  useMergeRefs,
  useStyleConfig,
} from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";
import { InputProps } from "./index";
import { ClearBtn, FloatingPlaceholder, useInput } from "./__helpers__";

export type Props = TextareaProps & Pick<InputProps, "hasFloatingPlaceholder" | "hasClearBtn">;

export const TextArea = forwardRef<Props, "textarea">(
  (
    {
      placeholder,
      hasFloatingPlaceholder = (placeholder?.length || 0) !== 0,
      rows = 5,
      cols = 28,
      hasClearBtn,
      children,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    propsRef
  ) => {
    const {
      _internalValue,
      _internalRef,
      isFocused,
      hasAlready,
      offsetLeft,
      paddingLeft,
      paddingRight,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear,
    } = useInput<"textarea">({ ...props, hasFloatingPlaceholder, onChange, onFocus, onBlur });

    const baseStyle = useStyleConfig("Textarea", props);
    const refs = useMergeRefs(_internalRef, propsRef);
    const bg = useColorModeValue("white", "gray.800");
    const _className = cx("scrollbar", props.className);
    const paddingY = +(baseStyle.paddingY?.toString() || 0) * 0.25;
    const borderTopWidth = _internalRef.current ? parseInt(getComputedStyle(_internalRef.current).borderTopWidth) : 0;

    return (
      <>
        <ChakraTextarea
          className={_className}
          placeholder={hasFloatingPlaceholder ? undefined : placeholder}
          value={_internalValue}
          rows={rows}
          cols={cols}
          paddingLeft={paddingLeft ? paddingLeft + "px" : undefined}
          paddingRight={paddingRight ? paddingRight + "px" : undefined}
          ref={refs}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        <chakra.span
          display="block"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          borderRadius={baseStyle.borderRadius?.toString()}
          padding={borderTopWidth + "px"}
          height={paddingY + 0.5 + "rem"}
          zIndex={1}
          background={bg}
          backgroundClip="content-box"
        />
        <FloatingPlaceholder
          atTextArea
          hasFloatingPlaceholder={hasFloatingPlaceholder}
          placeholder={placeholder}
          _internalValue={_internalValue}
          isFocused={isFocused}
          hasAlreadyLabel={hasAlready.label}
          offsetLeft={offsetLeft}
          defaultPaddingX={+(baseStyle.px?.toString() || 0) * 0.25}
          paddingTop={paddingY}
          paddingLeft={paddingLeft}
          borderTopWidth={borderTopWidth / 16}
        />
        <ClearBtn atTextArea hasClearBtn={hasClearBtn} _internalValue={_internalValue} handleClear={handleClear} />
        {children}
      </>
    );
  }
);

TextArea.displayName = "InputTextArea";
