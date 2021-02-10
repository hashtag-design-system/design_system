// Utils
export { calculatePercentage, calculateValue, range } from "./calculate";
export { kebabCase, snakeCase, stringifyChildren } from "./caseStyles";
export { error, isError } from "./error";
export { round } from "./round";
export { isInViewport } from "./viewport";
export { getDecade } from "./dates";
export { addClassnames } from "./styles";
export { clickOrType, checkSelectionInput, isJest, configCustomRender } from "./tests";
export { createCtx } from "./createCtx";
export type { ConfigCustomRenderOptions } from "./tests";

// Hooks
export { useAnimateCheckmark } from "./hooks/useAnimatedCheckmark";
export { useClassnames } from "./hooks/useClassnames";
export { useClickOutside } from "./hooks/useClickOutside";
export { useDisabled } from "./hooks/useDisabled";
export { useInputId, generateInputId } from "./hooks/useInputId";
export { useIsMobile } from "./hooks/useIsMobile";
export { useSelectionInput, SelectionInputGroupTypes } from "./hooks/useSelectionInput";
export { useSortableData } from "./hooks/useSortableData";
export { useAutosuggest } from "./hooks/useAutosuggest";
export { useHasMounted } from "./hooks/useHasMounted";
export { useWindowDimensions, getWindowDimensions } from "./hooks/useWindowDimensions";
export { useLocalStorage } from "./hooks/useLocalStorage";
export type { UseLocalStorageOptions } from "./hooks/useLocalStorage";
export type { WindowDimensionsType } from "./hooks/useWindowDimensions";
export type { SelectionInputGroupObj, SelectionInputGroupType, UseSelectionInputOptions } from "./hooks/useSelectionInput";
export type { AutosuggestHandleSearchOptions, UseAutosuggestOptions, AutosuggestItem } from "./hooks/useAutosuggest";

// Contexts
export * from "./contexts/DropdownContext";
export * from "./contexts/InputContext";
export * from "./contexts/SelectContext";
export * from "./contexts/SliderContext";
export * from "./contexts/DialogContext";
export * from "./contexts/TableContext";
export * from "./contexts/AutosuggestContext";
export * from "./contexts/DatePickerContext";
export * from "./contexts/ConfigContext";
