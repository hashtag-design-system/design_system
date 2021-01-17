import React, { useCallback, useEffect, useState } from "react";
import { AutosuggestContextProvider } from "../../utils/contexts";
import { useDisabled, useIsMobile } from "../../utils/hooks";
import Select, { SelectFilterFProps, SelectFProps } from "../Select";
import { SelectedItems } from "../Select/Select";
import { Filter } from "./__helpers__";

export type Props = {
  mobileView?: boolean;
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FProps = Props & Omit<SelectFilterFProps, "onSelect" | "onChange"> & Pick<SelectFProps, "defaultOpen" | "onSelect">;

const Autosuggest: React.FC<FProps> = React.memo(({
  defaultValue,
  defaultOpen = false,
  mobileView = false,
  filterById,
  onChange,
  onFocus,
  onBlur,
  onSelect,
  children,
  ...props
}) => {
  const [isShown, setIsShown] = useState(defaultOpen);
  const [value, setValue] = useState<string>(String(defaultValue || ""));
  const [items, setItems] = useState<SelectedItems[]>([]);
  const [key, setKey] = useState("");
  const isDisabled = useDisabled(props);
  const { isMobile } = useIsMobile(mobileView);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsShown(true);

    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (key === "Tab") {
      return;
    }

    setIsShown(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (!isDisabled) {
      setValue(newVal);
      setIsShown(true);
    }

    if (onChange) {
      onChange(newVal, e);
    }
  }, [isDisabled, onChange]);

  const handleDismiss = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;
    // @ts-expect-error
    const testId = target.getAttribute("data-testid");

    if (testId === "modal" || testId === "select-item") {
      setIsShown(false);
      setKey("Escape");
      handleBlur(e as any);
    }
  };

  const handleSelect = (selectItems: SelectedItems[]) => {
    setItems(selectItems);
    const checkedItem = selectItems.filter(item => item.selected);
    if (checkedItem.length > 0 && !isDisabled) {
      const newVal = checkedItem[0].content;
      setValue(newVal);

      if (onChange) {
        onChange(newVal);
      }
    }
    if (onSelect) {
      onSelect(selectItems);
    }
  };

  useEffect(() => {
    const checkedItems = items.filter(item => item.selected);
    if (isShown && checkedItems.length > 0) {
      setIsShown(false);
    }

    // eslint-disable-next-line
  }, [items]);

  const fMobile = isMobile || mobileView;

  return (
    <AutosuggestContextProvider
      value={{
        inputValue: value,
        key,
        setKey,
        filterById,
        handleChange,
        handleFocus,
      }}
    >
      <Select
        open
        className="autosuggest__select__container"
        mobileView={mobileView}
        onDismiss={e => handleDismiss(e)}
        onToggle={e => handleDismiss(e as any)}
        onSelect={items => handleSelect(items)}
        data-testid="autosuggest-select-container"
      >
        <Select.Button className="autosuggest__select__btn" />
        <Filter onBlur={e => !fMobile && handleBlur(e)} {...props} />
        <Select.Modal open={isShown}>
          {fMobile && <Filter onBlur={e => handleBlur(e)} {...props} />}
          <Select.Options>{children}</Select.Options>
        </Select.Modal>
      </Select>
    </AutosuggestContextProvider>
  );
});

Autosuggest.displayName = "Autosuggest";

export default Autosuggest;
