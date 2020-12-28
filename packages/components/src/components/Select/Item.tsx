import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";
import Select from "./Select";

export type FProps = Required<Pick<ComponentProps<"input">, "id">> &
  Pick<ComponentProps<"input">, "defaultChecked" | "children" | "className"> &
  ComponentProps<"div", false>;

export const Item: React.FC<FProps> = ({ id, defaultChecked = false, onClick, children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [classNames, rest] = useClassnames<Partial<FProps>>("select__item", props);

  const [isChecked, setIsChecked] = useState(defaultChecked);

  const { multiSelectable, selectedItems, isMobile, setSelectedItems, handleToggle } = useSelectContext();

  const addSelectItem = useCallback(() => {
    setSelectedItems(prevState => [...prevState, { id, content: children?.toString() || null }]);
  }, [id, children, setSelectedItems]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!multiSelectable) {
      handleToggle(e, false);
    }
    // state has not been updated yet, that is why the opposite is used
    const content = e.currentTarget.textContent;
    if (multiSelectable) {
      if (!isChecked) {
        addSelectItem();
      } else {
        setSelectedItems(prevState => prevState.filter(me => me.id !== id));
      }
    } else {
      setSelectedItems([{ id, content }]);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    if (defaultChecked) {
      addSelectItem();
    }
  }, [defaultChecked, addSelectItem]);

  useEffect(() => {
    setIsChecked(selectedItems.map(item => item.id).includes(id));
  }, [id, selectedItems]);

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
        tabIndex={0}
        onClickCapture={e => handleClick(e)}
        aria-selected={isChecked}
        data-testid="select-item"
        {...rest}
      >
        <input
          type="checkbox"
          value={String(isChecked)}
          aria-checked={isChecked}
          id={id}
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