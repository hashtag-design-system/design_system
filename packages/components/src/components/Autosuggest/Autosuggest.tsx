import React, { useEffect, useState } from "react";
import { useDisabled, useIsMobile } from "../../utils/hooks";
import { InputFProps } from "../Input";
import Select, { SelectFProps } from "../Select";
import { SelectedItems } from "../Select/Select";

export type Props = {
  mobileView?: boolean;
};

export type FProps = Props & InputFProps & Pick<SelectFProps, "defaultOpen">;

const Autosuggest: React.FC<FProps> = ({
  defaultValue,
  defaultOpen = false,
  mobileView = false,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isShown, setIsShown] = useState(defaultOpen);
  const [value, setValue] = useState(defaultValue);
  const [selectValue, setSelectValue] = useState("");
  const [items, setItems] = useState<SelectedItems[]>([]);
  const [key, setKey] = useState("");
  const [typing, setTyping] = useState(false);
  const isDisabled = useDisabled(props);
  const { isMobile } = useIsMobile(mobileView);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsShown(true);
    setTyping(false);

    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (key === "Tab") {
      return 1;
    }

    setIsShown(false);
    setTyping(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (!isDisabled) {
      setValue(newVal);
    }

    setTyping(true);

    if (onChange) {
      onChange(e);
    }
  };

  const handleDismiss = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;
    // @ts-expect-error
    const testId = target.getAttribute("data-testid");

    if (testId === "modal") {
      setIsShown(false);
    }
  };

  const handleSelect = (selectTtems: SelectedItems[]) => {
    setItems(selectTtems);
    const checkedItem = selectTtems.filter(item => item.selected);
    if (checkedItem.length > 0 && !isDisabled) {
      setSelectValue(checkedItem[0].content || "");
    }
  };

  useEffect(() => {
    const checkedItems = items.filter(item => item.selected);
    if (isShown && !typing && checkedItems.length > 0) {
      setIsShown(false);
    }
    // eslint-disable-next-line
  }, [items]);

  return (
    <div>
      <Select open onSelect={items => handleSelect(items)} style={{ width: "100%" }} onDismiss={e => handleDismiss(e)}>
        <Select.Button style={{ display: "none" }} />
        <Select.Filter
          onKeyDown={e => setKey(e.code)}
          value={typing ? value : selectValue || value}
          overrideOnChange
          onFocus={e => handleFocus(e)}
          onBlur={e => !isMobile && handleBlur(e)}
          onChange={e => handleChange(e)}
          {...props}
        />
        <Select.Modal open={isShown}>
          {isMobile && (
            <Select.Filter
              onKeyDown={e => setKey(e.code)}
              value={typing ? value : selectValue || value}
              overrideOnChange
              onFocus={e => handleFocus(e)}
              onBlur={e => handleBlur(e)}
              onChange={e => handleChange(e)}
              {...props}
            />
          )}
          <Select.Options>
            <Select.Item id="hey_george" content="Hey_george" />
            <Select.Item id="amsterdam" content="Amsterdam george" />
            <Select.Item id="amsterdamstrong" content="Amsterdam" />
            <Select.Item id="georgekrax" content="Hey" />
            <Select.Item id="georgekrax2" content="Me" />
            <Select.Item id="georgekrax3" content="Me2" />
            {/* <Select.Item id="georgekrax4" content="Me3" />
            <Select.Item id="georgekrax4" content="Me3" />
            <Select.Item id="georgekrax5" content="Me4" />
            <Select.Item id="georgekrax6" content="Me5" />
            <Select.Item id="georgekrax7" content="Me7" />
            <Select.Item id="georgekrax8" content="Me8" />
            <Select.Item id="georgekrax9" content="Me9" /> */}
          </Select.Options>
        </Select.Modal>
      </Select>
    </div>
  );
};

Autosuggest.displayName = "Autosuggest";

export default Autosuggest;
