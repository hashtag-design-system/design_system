import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames, useDisabled } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";
import Select from "./Select";

export type FProps = Required<Pick<ComponentProps<"input">, "id">> &
  Pick<ComponentProps<"input">, "defaultChecked" | "children" | "className"> &
  ComponentProps<"div", false>;

export const Item: React.FC<FProps> = ({ id, defaultChecked = false, onClick, children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [classNames, rest] = useClassnames<Partial<FProps>>("select__item", props);
  const isDisabled = useDisabled(props);

  const [isChecked, setIsChecked] = useState(defaultChecked);

  const { multiSelectable, items, isMobile, setItems, handleToggle } = useSelectContext();

  const addItem = useCallback(
    (selected = false) => {
      setItems(prevState => [...prevState, { id, content: children?.toString() || null, selected }]);
    },
    [id, children, setItems]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!multiSelectable) {
      handleToggle(e, false);
    }
    // state has not been updated yet, that is why the opposite is used
    const content = e.currentTarget.textContent;
    if (multiSelectable) {
      // Opposite because the state has not changed yet
      if (!isChecked) {
        addItem(!isChecked);
      } else {
        setItems(prevState => prevState.filter(me => me.id !== id));
      }
    } else {
      setItems([{ id, content, selected: !isChecked }]);
    }

    if (onClick) {
      onClick(e);
    }
    setIsChecked(items.find(item => item.id === id)?.selected || !isChecked);
  };

  useEffect(() => {
    if (typeof jest === "undefined") {
      if (!items.map(item => item.id).includes(id)) {
        addItem(defaultChecked);
      }
    }
  }, [items, id, addItem, defaultChecked]);

  useEffect(() => {
    setIsChecked(items.find(item => item.id === id)?.selected || isChecked);
  }, [id, isChecked, items]);

  useEffect(() => {
    if (!isChecked && ref && ref.current) {
      ref.current.blur();
    }
  }, [isChecked]);

  return (
    <>
      <div
        className={classNames}
        ref={ref}
        tabIndex={isDisabled ? -1 : 0}
        onClick={e => handleClick(e)}
        aria-selected={isChecked}
        aria-disabled={isDisabled}
        data-testid="select-item"
        {...rest}
      >
        <input
          type="checkbox"
          value={String(isChecked)}
          aria-checked={isChecked}
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

Item.displayName = "SelectItem";
