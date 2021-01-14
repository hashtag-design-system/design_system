import React, { useEffect, useRef, useState } from "react";
import { SelectContextProvider } from "../../utils/contexts";
import { useClassnames, useClickOutside, useIsMobile } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";
import { Button } from "./Button";
import Countries from "./Countries";
import { Filter } from "./Filter";
import { Header } from "./Header";
import { Hr } from "./Hr";
import { Item } from "./Item";
import { Modal } from "./Modal";
import { Options } from "./Options";

export type SelectedItems = {
  id: string;
  content: string;
  valueAlternative?: string;
  highlightedChildren: string;
  selected: boolean;
  isShown: boolean;
  ref?: React.RefObject<HTMLDivElement>;
};

export type Props = {
  defaultOpen?: boolean;
  multiSelectable?: boolean;
  mobileView?: boolean;
  onSelect?: (selected: SelectedItems[]) => void;
  onDismiss?: (e: React.MouseEvent<HTMLElement>) => void;
  onOutsideClick?: (outsideClick: boolean) => void;
} & Pick<React.CSSProperties, "width">;

type SubComponents = {
  Item: typeof Item;
  Header: typeof Header;
  Modal: typeof Modal;
  Button: typeof Button;
  Hr: typeof Hr;
  Filter: typeof Filter;
  Options: typeof Options;
  Countries: typeof Countries;
};

export type FProps = Props &
  Omit<ComponentProps<"details", false>, "onSelect"> & {
    forwardRef?: ComponentProps<"details", true>["ref"];
  };

export type SBProps = Props & Pick<FProps, "defaultOpen" | "onToggle" | "onSelect">;

const Select: React.FC<FProps> & SubComponents = ({
  defaultOpen = false,
  multiSelectable = false,
  mobileView = false,
  children,
  open,
  forwardRef,
  width = "200px",
  onToggle,
  onSelect,
  onOutsideClick,
  onDismiss,
  ...props
}) => {
  const { ref: modalRef, isOpen, setIsOpen, outsideClick } = useClickOutside<HTMLDivElement>(defaultOpen, undefined, onDismiss);
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<SelectedItems[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [classNames, rest] = useClassnames("select__box__container", props);
  const { isMobile } = useIsMobile(mobileView);

  useEffect(() => {
    if (onOutsideClick) {
      onOutsideClick(outsideClick);
    }
  }, [outsideClick, onOutsideClick]);

  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      e.preventDefault();
    }
  };

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
    if (e.target instanceof HTMLInputElement) {
      return;
    }
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
    setValue(
      items
        .filter(item => item.selected)
        .map(item => {
          if (item.valueAlternative) {
            return item.valueAlternative;
          } else {
            return item.content;
          }
        })
        .join(", ")
    );
  }, [items]);

  const fOpen = open === undefined ? isOpen : open;
  const fMobile = isMobile || mobileView;

  return (
    <SelectContextProvider
      value={{
        isOpen: fOpen,
        ref: forwardRef,
        value,
        multiSelectable,
        items,
        isMobile: fMobile,
        modalRef,
        width,
        setItems,
        handleToggle,
        setIsDisabled,
        onSelect,
      }}
    >
      <div className="select__container" ref={divRef} data-testid="select-container">
        <details
          ref={fMobile ? undefined : modalRef}
          className={classNames}
          open={fOpen}
          onClick={e => handleClick(e)}
          onToggle={e => handleToggle(e)}
          onKeyDown={e => handleKeyDown(e)}
          data-testid="select"
          {...rest}
        >
          {children}
        </details>
      </div>
    </SelectContextProvider>
  );
};

Select.Header = Header;
Select.Item = Item;
Select.Modal = Modal;
Select.Button = Button;
Select.Hr = Hr;
Select.Filter = Filter;
Select.Options = Options;
Select.Countries = Countries;

export default Select;
