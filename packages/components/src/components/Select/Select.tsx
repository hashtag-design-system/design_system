import React, { useEffect, useRef, useState } from "react";
import { SelectContextProvider } from "../../utils/contexts";
import { useClassnames, useClickOutside, useDisabled } from "../../utils/hooks";
import { InputFProps } from "../Input";
import { ComponentProps } from "../__helpers__";
import { Button } from "./Button";
import { Header } from "./Header";
import Hr from "./Hr";
import { Item } from "./Item";
import Modal from "./Modal";

export type SelectedItems = { id: string; content: string | null };

export type Props = {
  defaultOpen?: boolean;
  paddingOnHeaderItems?: boolean;
  multiSelectable?: boolean;
  onSelect?: (selected: SelectedItems[]) => void;
};

type SubComponents = {
  Item: typeof Item;
  Header: typeof Header;
  Modal: typeof Modal;
  Button: typeof Button;
  Hr: typeof Hr;
};

export type FProps = Props &
  Required<Pick<InputFProps, "placeholder">> &
  Omit<ComponentProps<"details", false>, "onSelect"> & {
    forwardRef?: ComponentProps<"details", true>["ref"];
  };

const Select: React.FC<FProps> & SubComponents = ({
  placeholder,
  defaultOpen = false,
  paddingOnHeaderItems = false,
  multiSelectable = false,
  children,
  forwardRef,
  onToggle,
  onSelect,
  ...props
}) => {
  const { ref: detailsRef, isOpen, setIsOpen } = useClickOutside<HTMLDetailsElement>(defaultOpen);
  const [value, setValue] = useState<string>(placeholder);
  const [onlyChild, setOnlyChild] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<SelectedItems[]>([]);
  const [classNames, rest] = useClassnames("select__box__container", props);
  const isDisabled = useDisabled<boolean>(props);

  const divRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.SyntheticEvent<HTMLElement>, boolean = true) => {
    e.preventDefault();
    if (!isDisabled) {
      if (boolean) {
        // @ts-expect-error
        setIsOpen(e.target.open);
      } else {
        setIsOpen(!isOpen);
      }
    }

    if (onToggle) {
      onToggle(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    const focusItem = (next: boolean) => {
      if (divRef && divRef.current) {
        const options = Array.from(divRef.current.getElementsByClassName("select__item"));
        const selected = document.activeElement;

        let item: Element = options[0];
        if (selected && selected.tagName.toLowerCase() === "div") {
          const idx = options.indexOf(selected);
          if (next) {
            const nextOpt = options[idx + 1];
            if (nextOpt) {
              item = nextOpt;
              // (nextOpt as HTMLDivElement).focus();
            }
          } else {
            const nextOpt = options[idx - 1];
            if (nextOpt) {
              item = nextOpt;
              // (nextOpt as HTMLDivElement).focus();
            } else {
              item = options[options.length - 1];
            }
          }
        }
        return item;
      }
    };

    const isSummaryFocused = e.target instanceof Element && e.target.tagName.toLowerCase() === "summary";
    switch (e.code) {
      case "Escape":
        if (isOpen) {
          handleToggle(e, false);
        }
        break;
      case "Space":
      case "Enter":
        handleToggle(e, false);

        const selected = document.activeElement;
        if (!isSummaryFocused) {
          if (selected && selected.className === "select__item") {
            // @ts-expect-error
            document.activeElement.click();
            e.preventDefault();
          }
        }

        break;
      case "ArrowDown":
        if (isSummaryFocused && !isOpen) {
          handleToggle(e, false);
        } else {
          const target = focusItem(true);
          if (target) {
            (target as HTMLDivElement).focus();
          }
          e.preventDefault();
        }
        break;
      case "ArrowUp":
        if (isSummaryFocused && isOpen) {
          handleToggle(e, false);
        } else {
          const target = focusItem(false);
          if (target) {
            (target as HTMLDivElement).focus();
          }
          e.preventDefault();
        }
        break;
    }
  };

  useEffect(() => {
    setValue(selectedItems.map(item => item.content).join(", "));
    if (onSelect) {
      onSelect(selectedItems);
    }
  }, [selectedItems, onSelect]);

  useEffect(() => {
    if (paddingOnHeaderItems) {
      setOnlyChild(false);
    } else {
      if (divRef && divRef.current) {
        const headers = divRef.current.getElementsByTagName("h6");
        setOnlyChild(headers.length <= 1);
      }
    }
  }, [paddingOnHeaderItems, divRef]);

  return (
    <SelectContextProvider
      value={{
        isOpen,
        ref: forwardRef,
        setIsOpen,
        onlyChild,
        value,
        multiSelectable,
        selectedItems,
        setSelectedItems,
        handleToggle,
      }}
    >
      <div className="select__container" ref={divRef}>
        <details
          ref={detailsRef}
          className={classNames}
          open={isOpen}
          onToggle={e => handleToggle(e)}
          onKeyDown={e => handleKeyDown(e)}
          {...rest}
        >
          {children}
        </details>
      </div>
    </SelectContextProvider>
  );
};

Select.displayName = "Select";
Select.Header = Header;
Select.Item = Item;
Select.Modal = Modal;
Select.Button = Button;
Select.Hr = Hr;

export default Select;
