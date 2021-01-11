import parse from "html-react-parser";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames, useDisabled } from "../../utils/hooks";
import { ComponentProps, ComponentState } from "../__helpers__";
import Select from "./Select";

export type Props = {
  // Make required
  content?: string;
  htmlContent?: { before?: React.ReactNode; after?: React.ReactNode };
};

export type FProps = Props &
  Required<Pick<ComponentProps<"input">, "id">> &
  Pick<ComponentProps<"input">, "defaultChecked" | "children" | "className"> &
  ComponentProps<"div", false> &
  ComponentState<"default" | "hover" | "focus" | "disabled">;

export type SBProps = Props & Pick<FProps, "id" | "state" | "defaultChecked" | "onClick">;

export const Item: React.FC<FProps> = ({
  id,
  state,
  defaultChecked = false,
  content = "",
  htmlContent,
  onClick,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [classNames, rest] = useClassnames<Partial<FProps>>("select__item", props, { stateToRemove: { state } });
  const isDisabled = useDisabled(props, state);

  const [isChecked, setIsChecked] = useState(defaultChecked);

  const { multiSelectable, items, isMobile, setItems, handleToggle } = useSelectContext();

  const addItem = useCallback(() => {
    if (!isDisabled) {
      setItems(prevState => [...prevState, { id, content, highlightedChildren: content, selected: defaultChecked, isShown: true }]);
      // { id, content, highlightedChildren: content, selected: defaultChecked, isShown: true },
    }
  }, [id, defaultChecked, content, isDisabled, setItems]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!multiSelectable) {
      handleToggle(e, false);
    }

    // state has not been updated yet, that is why the opposite is used
    const newItems = items.map(item => {
      if (item.id === id) {
        const newItem = {
          ...item,
          // Opposite because the state has not changed yet
          selected: !isChecked,
        };
        return newItem;
      }

      if (multiSelectable) {
        return item;
      } else {
        return { ...item, selected: false };
      }
    });
    if (!isDisabled) {
      setItems(newItems);
    }

    if (onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    // if (typeof jest === "undefined") {
    if (!items.map(item => item.id).includes(id)) {
      // if (items.length === 0) {
      addItem();
      // }
    }
    // }
  }, [id, items, addItem]);

  useEffect(() => {
    setIsChecked(items.find(item => item.id === id)?.selected!);
  }, [id, isChecked, items]);

  useEffect(() => {
    if ((!isChecked || isDisabled) && ref && ref.current) {
      ref.current.blur();
    }
  }, [isDisabled, isChecked]);

  if (
    items
      .filter(item => item.isShown === false)
      .map(item => item.id)
      .includes(id)
  ) {
    return null;
  }

  const fChecked = isChecked || defaultChecked;

  return (
    <>
      <div
        className={classNames}
        ref={ref}
        tabIndex={isDisabled ? -1 : 0}
        onClick={e => handleClick(e)}
        aria-selected={fChecked}
        aria-disabled={isDisabled}
        data-testid="select-item"
        role="option"
        {...rest}
      >
        <input
          type="checkbox"
          value={String(fChecked)}
          aria-checked={fChecked}
          id={id}
          disabled={Boolean(isDisabled)}
          aria-disabled={isDisabled}
          className="select__item__input"
          data-testid="select-item-input"
        />
        <label unselectable="on" htmlFor={id} className="body-14" data-testid="select-item-label">
          {htmlContent?.before}
          {parse(items.find(item => item.id === id)?.highlightedChildren?.toString() || "")}
          {htmlContent?.after}
        </label>
      </div>
      {isMobile && <Select.Hr />}
      {/* </MobileView> */}
    </>
  );
};
