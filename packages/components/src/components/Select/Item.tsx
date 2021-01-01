import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames, useDisabled } from "../../utils/hooks";
import { ComponentProps, ComponentState } from "../__helpers__";
import Select from "./Select";

export type FProps = Required<Pick<ComponentProps<"input">, "id">> &
  Pick<ComponentProps<"input">, "defaultChecked" | "children" | "className"> &
  ComponentProps<"div", false> &
  ComponentState<"default" | "hover" | "focus" | "disabled">;

export const Item: React.FC<FProps> = ({ id, state, defaultChecked = false, onClick, children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [classNames, rest] = useClassnames<Partial<FProps>>("select__item", props, { stateToRemove: { state } });
  const isDisabled = useDisabled(props, state);

  const [isChecked, setIsChecked] = useState(defaultChecked);

  const { multiSelectable, items, isMobile, setItems, handleToggle } = useSelectContext();

  let newChildren = children?.toString() || null;
  if (children) {
    newChildren = React.Children.toArray(children)
      .map(child => {
        if (typeof child === "object") {
          return (child as React.ReactElement).props.children;
        }
        return child;
      })
      .join(" ");
  }

  const addItem = useCallback(() => {
    if (!isDisabled) {
      setItems(prevState => [...prevState, { id, content: newChildren, selected: defaultChecked, isShown: true }]);
    }
  }, [isDisabled, id, defaultChecked, newChildren, setItems]);

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

  return (
    <>
      <div
        className={classNames}
        ref={ref}
        tabIndex={isDisabled ? -1 : 0}
        onClick={e => handleClick(e)}
        aria-selected={isChecked || defaultChecked}
        aria-disabled={isDisabled}
        data-testid="select-item"
        {...rest}
      >
        <input
          type="checkbox"
          value={String(isChecked || defaultChecked)}
          aria-checked={isChecked || defaultChecked}
          id={id}
          disabled={Boolean(isDisabled)}
          aria-disabled={isDisabled}
          className="select__item__input"
          data-testid="select-item-input"
        />
        <label unselectable="on" htmlFor={id} className="body-14" data-testid="select-item-label">
          {children}
        </label>
      </div>
      {isMobile && <Select.Hr />}
      {/* </MobileView> */}
    </>
  );
};
