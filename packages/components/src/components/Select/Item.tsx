import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";

export type FProps = Required<Pick<ComponentProps<"input">, "id">> &
  Pick<ComponentProps<"input">, "defaultChecked" | "children" | "className"> &
  ComponentProps<"div", false>;

export const Item: React.FC<FProps> = ({ id, defaultChecked = false, children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [classNames, rest] = useClassnames<Partial<FProps>>("select__item", props);

  const [isChecked, setIsChecked] = useState(defaultChecked);

  const { multiSelectable, selectedItems, setSelectedItems, handleToggle } = useSelectContext();

  const addSelectItem = useCallback(() => {
    setSelectedItems(prevState => [...prevState, { id, content: children?.toString() || null }]);
  }, [id, children, setSelectedItems]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!multiSelectable) {
        handleToggle(e);
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
    },
    [id, multiSelectable, isChecked, handleToggle, setSelectedItems, addSelectItem]
  );

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
    <div
      className={classNames}
      ref={ref}
      tabIndex={0}
      onClick={e => handleClick(e)}
      // onDoubleClick={(e) => handleToggle(e)}
      aria-selected={isChecked}
      {...rest}
    >
      <input type="checkbox" value={String(isChecked)} aria-checked={isChecked} id={id} className="select__item__input" />
      <label htmlFor={id} className="body-14">
        {children}
      </label>
    </div>
  );
};
