import { useEffect, useRef, useState } from "react";
import { InputProps, InputTextareaProps } from "../index";

export const useInput = <T extends "input" | "textarea" = "input">({
  value,
  defaultValue,
  hasFloatingPlaceholder,
  onChange,
  onFocus,
  onBlur,
}: Pick<
  T extends "input" ? InputProps : InputTextareaProps,
  "value" | "defaultValue" | "hasFloatingPlaceholder" | "onChange" | "onFocus" | "onBlur"
>) => {
  type Elem = T extends "input" ? HTMLInputElement : HTMLTextAreaElement;
  const _parsed = (value || defaultValue)?.toString() || "";
  const [_internalValue, _setInternalValue] = useState(_parsed);
  const [isFocused, setIsFocused] = useState(_internalValue.length !== 0);
  const [{ left: paddingLeft, right: paddingRight }, setPadding] = useState({ left: 0, right: 0 });
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [hasAlready, setHasAlready] = useState({ label: true, group: true });
  const _internalRef = useRef<Elem>(null);

  const handleClear = () => _setInternalValue("");

  const handleChange = (e: React.FocusEvent<Elem>) => {
    _setInternalValue(e.target.value);
    if (onChange) onChange(e as any);
  };

  const handleFocus = (e: React.FocusEvent<Elem>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e as any);
  };

  const handleBlur = (e: React.FocusEvent<Elem>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e as any);
  };

  useEffect(() => _setInternalValue(_parsed), [_parsed]);

  useEffect(() => {
    const group = _internalRef.current?.closest("div.chakra-input__group");
    setOffsetLeft(_internalRef.current?.offsetLeft || 0);
    const label = _internalRef.current
      ?.closest('div.chakra-form-control[role="group"]')
      ?.querySelector<HTMLLabelElement>("label.chakra-form__label");
    setHasAlready({ label: !!label, group: !!group || !hasFloatingPlaceholder });
    if (group) {
      const elements = group.querySelectorAll<HTMLDivElement>("div.chakra-input__right-element, div.chakra-input__left-element");
      elements.forEach(node => {
        const styles = getComputedStyle(node);
        const isLeft = parseInt(styles.left) === 0;
        const marginX = parseInt(styles.marginLeft) + parseInt(styles.marginRight);
        setPadding(prev => ({ ...prev, [isLeft ? "left" : "right"]: node.offsetWidth + marginX }));
      });
    }
  }, [_internalRef, hasFloatingPlaceholder]);

  return {
    _internalValue,
    _internalRef,
    isFocused,
    paddingLeft,
    paddingRight,
    paddingTop: hasFloatingPlaceholder ? undefined : 0,
    offsetLeft,
    hasAlready,
    _setInternalValue,
    handleChange,
    handleFocus,
    handleBlur,
    handleClear,
  };
};
